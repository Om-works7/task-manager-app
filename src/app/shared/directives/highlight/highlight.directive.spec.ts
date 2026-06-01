import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let mockElement: any;

  beforeEach(() => {
    mockElement = {
      nativeElement: {
        style: {},
      },
    };

    directive = new HighlightDirective(mockElement as ElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set background color when highlight is true', () => {
    directive.appHighlight = true;
    directive.ngOnChanges();

    expect(mockElement.nativeElement.style.backgroundColor).toBe('#d4edda');
  });

  it('should reset background color when highlight is false', () => {
    directive.appHighlight = false;
    directive.ngOnChanges();

    expect(mockElement.nativeElement.style.backgroundColor).toBe('white');
  });
});