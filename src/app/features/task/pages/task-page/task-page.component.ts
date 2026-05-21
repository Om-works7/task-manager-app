import { Component, computed, inject, signal } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskFormComponent } from "../../components/task-form/task-form.component";
import { FilterBarComponent } from "../../components/filter-bar/filter-bar.component";

@Component({
  selector: 'app-task-page',
  imports: [TaskListComponent, TaskFormComponent, FilterBarComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {

  private taskService = inject(TaskService);  

  tasks = this.taskService.tasks$;

  filter = signal<'all' | 'completed' | 'pending'>('all');

  
  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();

    if (filter === 'completed') return tasks.filter(t => t.completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  });


  showModal = signal(false);

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
