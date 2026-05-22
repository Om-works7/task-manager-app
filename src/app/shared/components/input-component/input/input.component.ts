import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]

})
export class InputComponent implements ControlValueAccessor {
  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  
  writeValue(value: string): void {
    this.value = value || '';
  }
  registerOnChange(fn:any): void {
    this.onChange = fn;
  }

  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }


  onBlur() {
    this.onTouched();
  }

}
