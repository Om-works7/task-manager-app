import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  @Input() appHighlight : boolean = false;
  constructor(private el : ElementRef) { }

  ngOnChanges() {
    if (this.appHighlight) {
      this.el.nativeElement.style.backgroundColor = '#d4edda';
    } else {
      this.el.nativeElement.style.backgroundColor = 'white';
    }
  }

}
