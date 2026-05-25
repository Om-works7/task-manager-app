import { Component, EventEmitter, inject, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { TaskService } from '../../../../core/services/task/task.service';


@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private taskService = inject(TaskService);
  // tasks$ = this.taskService.loadTasks();
  private searchSubject = new Subject<string>();
  @Output() searchChange = new EventEmitter<string>();
  // @Output() filterChange = new EventEmitter<'all' | 'completed' | 'pending'>();
  

  ngOnInit() {
    this.searchSubject
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.searchChange.emit(value);
    })
  }

  
  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  // onFilterChange(filter: 'all' | 'completed' | 'pending') {
  //   this.filterChange.emit(filter);
  // }

}
