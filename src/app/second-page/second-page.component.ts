import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {camelCase} from 'lodash';
import {AppSettingsService} from '../app.services';

interface LinkObj {
  first: string;
  last: string;
}

export class ItemData {
  id: string;
  type: ItemTypeEnum;
  links: ItemLink;
  attributes: ItemAttribute;
  relationships: ItemRelationship;
  constructor(input: Pick<ItemData, 'id' | 'type' | 'links' | 'attributes' | 'relationships'>) {
    this.id = input.id;
    this.type = input.type;
    this.links = input.links;
    this.attributes = input.attributes;
    this.relationships = input.relationships;
  }
}

const itemDataField = {

  id: {value: 'id', title: 'ID'},
  content: {value: 'attributes.content', title: 'Content'},
  authors: {value: 'authors', title: 'Authors'}
};

export enum ItemTypeEnum {
  books = "books"
}

interface ItemLink { self:string; related?: string; }
interface ItemRelationship {
  authors: {
    links: ItemLink;
  };
  publishers: {
    links: ItemLink;
  };
}
interface ItemAttribute {
  urn: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  properties: any,
  displayProperties: {
    type: string;
    image: string;
  }
}

const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => camelizeKeys(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};


@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [itemDataField.id.value, itemDataField.content.value, itemDataField.authors.value];
  itemDataFieldVew = itemDataField;
  dataSource: MatTableDataSource<ItemData> = new MatTableDataSource<ItemData>();
  linkObj: LinkObj | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appSettingsService : AppSettingsService) {}

  ngAfterViewInit() {
  }

  setUpTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case itemDataField.content.value: return item.attributes.content;
        default: return item[property];
      }
    };
    this.appSettingsService.getJSON().subscribe(data => {
      if (data) {
        let result: ItemData[] = [];
        const parsedData: { data: ItemData[]; links: LinkObj } = camelizeKeys(data);
        if (parsedData?.data?.length) {
          result = parsedData.data.map(item => {
            return new ItemData({...item});
          });
        }
        this.itemData = result;
        this.sortedData = result;
        this.dataSource.data = result;
        this.linkObj = parsedData.links || null;
        this.setUpTable();
      }
    });
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource([]);
  }
  itemData: ItemData[];
  sortedData: ItemData[];

  sortData(sort: Sort) {
    const data = this.itemData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case itemDataField.id.value: return compare(a.id, b.id, isAsc);
        case itemDataField.content.value: return compare(a.attributes.content, b.attributes.content, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function nestedFilterCheck(search, data, key) {
  if (typeof data[key] === 'object') {
    for (const k in data[key]) {
      if (data[key][k] !== null) {
        search = nestedFilterCheck(search, data[key], k);
      }
    }
  } else {
    search += data[key];
  }
  return search;
}
