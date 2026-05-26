import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnHoverHighlight]'
})
export class OnHoverHighlightDirective {

  constructor() { }

  @HostBinding('style.backgroundColor') bg = 'white';

  
  @HostListener('mouseenter')
  onEnter() {
    this.bg = 'lightblue';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.bg = 'white';
  }


}
