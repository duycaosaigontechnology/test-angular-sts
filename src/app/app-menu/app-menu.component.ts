import {Component, OnInit, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  constructor(private el:ElementRef) { }

  ngOnInit() {
  }
  closeMenu() {
    this.onClose.emit();
  }

  // @HostListener('click', ['$event.target'])
  // onClick(target){
  //   let item = this.el.nativeElement.querySelector('li');
  //
  //   alert(item);
  // }
}
