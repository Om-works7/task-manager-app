import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPriorityColor]'
})
export class PriorityColorDirective {

  @Input() appPriorityColor: 'low' | 'medium' | 'high' = 'low';
  constructor(private el: ElementRef) { }
    
  ngOnChanges() {
    let color = '';

    switch (this.appPriorityColor) {
      case 'low':
        color = 'green';
        break;
      case 'medium':
        color = 'orange';
        break;
      case 'high':
        color = 'red';
        break;
    }

    this.el.nativeElement.style.borderLeft = `5px solid ${color}`;
  }


}
