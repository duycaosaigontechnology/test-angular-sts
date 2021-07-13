import {ComponentFactoryResolver, Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppReplaceComponent} from './app-replace/app-replace.component';

@Directive({
  selector: '[appReplaceText]',
})
export class ReplaceTextDirective implements OnInit {
  @Input() appReplaceText: string;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const compFactory = this.resolver.resolveComponentFactory(AppReplaceComponent);
    const componentRef = compFactory.create(this.viewContainer.injector);
    componentRef.instance.data = this.appReplaceText;
    this.viewContainer.createEmbeddedView(componentRef.instance.mytemplate);
  }

}
