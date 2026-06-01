import { ElementRef } from '@angular/core';
import { PriorityColorDirective } from './priority-color.directive';

describe('PriorityColorDirective', () => {
  let directive: PriorityColorDirective;
  let mockElement: any;

  beforeEach(() => {
    mockElement = {
      nativeElement: {
        style: {},
      },
    };

    directive = new PriorityColorDirective(mockElement as ElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set green border for low priority', () => {
    directive.appPriorityColor = 'low';
    directive.ngOnChanges();

    expect(mockElement.nativeElement.style.borderLeft).toBe('5px solid green');
  });

  it('should set orange border for medium priority', () => {
    directive.appPriorityColor = 'medium';
    directive.ngOnChanges();

    expect(mockElement.nativeElement.style.borderLeft).toBe('5px solid orange');
  });

  it('should set red border for high priority', () => {
    directive.appPriorityColor = 'high';
    directive.ngOnChanges();

    expect(mockElement.nativeElement.style.borderLeft).toBe('5px solid red');
  });
});