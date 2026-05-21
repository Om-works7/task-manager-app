import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {

  @Output() filterChange = new EventEmitter<'all' | 'completed' | 'pending'>();

  
  setFilter(value: 'all' | 'completed' | 'pending') {
    this.filterChange.emit(value);
  }


}
