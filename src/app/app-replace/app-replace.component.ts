import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-replace',
  templateUrl: './app-replace.component.html',
  styleUrls: ['./app-replace.component.scss']
})
export class AppReplaceComponent implements OnInit {
  public data: any;
  @ViewChild("mytemplate", { static: true }) mytemplate: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
