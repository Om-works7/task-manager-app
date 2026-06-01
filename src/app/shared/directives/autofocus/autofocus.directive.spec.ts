import { ElementRef } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';

describe('AutofocusDirective', () => {
  let mockElement: any;
  let directive: AutofocusDirective;

  beforeEach(() => {
    mockElement = {
      nativeElement: {
        focus: jest.fn(),
      },
    };

    directive = new AutofocusDirective(mockElement as ElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call focus on nativeElement after view init', () => {
    directive.ngAfterViewInit();

    expect(mockElement.nativeElement.focus).toHaveBeenCalled();
  });
});