import { Component, computed, inject, signal } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { FilterBarComponent } from "../../components/filter-bar/filter-bar.component";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar/search-bar.component";
import { Store } from '@ngrx/store';
import * as TaskSelectors from '../../store/task.selectors';
import * as TaskActions from '../../store/task.actions';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-task-page',
  imports: [TaskListComponent, TaskFormComponent, FilterBarComponent, SearchBarComponent,AsyncPipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {

  private store = inject(Store);

  // comes from ngrx (Observable)
  tasks$ = this.store.select(TaskSelectors.selectFilteredTasks);
  showModal = signal(false);

  ngOnInit() {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Learn Angular',
        description: 'Practice signals & ngrx',
        completed: false,
        priority: 'high',
        createdAt: new Date()
      }
    ];

    this.store.dispatch(TaskActions.setTasks({ tasks: mockTasks }));
  }


  setSearch(value: string) {
    this.store.dispatch(TaskActions.setSearch({ search: value }));
  }

  setFilter(value: 'all' | 'completed' | 'pending') {
    this.store.dispatch(TaskActions.setFilter({ filter: value }));
  }

  addTask(task: Task) {
    this.store.dispatch(TaskActions.addTask({ task }));
    this.closeModal();
  }

  deleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  toggleTask(id: string) {
    this.store.dispatch(TaskActions.toggleTask({ id }));
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }











  // private taskService = inject(TaskService);
  // search = signal('');

  // tasks = this.taskService.tasks$;

  // result = this.tasks();

  // filter = signal<'all' | 'completed' | 'pending'>('all');

  

  // filteredTasks = computed(() => {
  //   const tasks = this.tasks();
  //   const filter = this.filter();
  //   const search = this.search().toLowerCase();

  //   let result = tasks;

  //   if (filter === 'completed') {
  //     result = result.filter(t => t.completed);
  //   } else if (filter === 'pending') {
  //     result = result.filter(t => !t.completed);
  //   }

  //   if (search) {
  //     result = result.filter(t =>
  //       t.title.toLowerCase().includes(search)
  //     );
  //   }

  //   return result;
  // });



  // showModal = signal(false);

  
  // setSearch(value: string) {
  // this.search.set(value);
  // }


  // ngOnInit() {
  //   this.getAllTasks();
  // }

  // getAllTasks() {
  //   this.taskService.loadTasks();
  // }

  // setFilter(value: 'all' | 'completed' | 'pending') {
  //   this.filter.set(value);
  // }


  // addTask(task : Task){
  //   this.taskService.addTask(task);
  //   this.closeModal();
  // }
  
  // deleteTask(id: string) {
  //   this.taskService.deleteTask(id);
  // }

  
  // toggleTask(id: string) {
  //   this.taskService.toggleTask(id);
  // }

  
  // openModal() {
  //   this.showModal.set(true);
  // }

  // closeModal() {
  //   this.showModal.set(false);
  // }


}
