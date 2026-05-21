import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../../shared/models/task.model';


@Injectable({ providedIn: 'root' })
export class TaskService {

  tasks = signal<Task[]>([]);
  tasks$ = this.tasks;

  completedTasks = computed(() =>
    this.tasks().filter(t => t.completed)
  );

  pendingTasks = computed(() =>
    this.tasks().filter(t => !t.completed)
  );

  addTask(task: Task) {
    this.tasks.update(prev => [...prev, task]);
  }

  deleteTask(id: string) {
    this.tasks.update(prev => prev.filter(t => t.id !== id));
  }

  toggleTask(id: string) {
    this.tasks.update(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }
}