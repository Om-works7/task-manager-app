import { Component, computed, inject, signal } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskService } from '../../../../core/services/task/task.service';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { FilterBarComponent } from "../../components/filter-bar/filter-bar.component";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar/search-bar.component";

@Component({
  selector: 'app-task-page',
  imports: [TaskListComponent, TaskFormComponent, FilterBarComponent, SearchBarComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {

  private taskService = inject(TaskService);
  search = signal('');

  tasks = this.taskService.tasks$;

  result = this.tasks();

  filter = signal<'all' | 'completed' | 'pending'>('all');

  

  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    const search = this.search().toLowerCase();

    let result = tasks;

    if (filter === 'completed') {
      result = result.filter(t => t.completed);
    } else if (filter === 'pending') {
      result = result.filter(t => !t.completed);
    }

    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search)
      );
    }

    return result;
  });



  showModal = signal(false);

  
  setSearch(value: string) {
  this.search.set(value);
  }


  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.loadTasks();
  }

  setFilter(value: 'all' | 'completed' | 'pending') {
    this.filter.set(value);
  }


  addTask(task : Task){
    this.taskService.addTask(task);
    this.closeModal();
  }
  
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  
  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  
  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }


}
