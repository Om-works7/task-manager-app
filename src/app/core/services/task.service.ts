import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private api = 'http://localhost:3000/tasks';

  tasks = signal<Task[]>([]);
  tasks$ = this.tasks;

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<Task[]>(this.api).subscribe(data => {
      this.tasks.set(data);
    });
  }
  
  addTask(task: Task) {
    this.http.post<Task>(this.api, task).subscribe(newTask => {
      this.tasks.update(prev => [...prev, newTask]);
    });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.api}/${id}`).subscribe(() => {
      this.tasks.update(prev => prev.filter(t => t.id !== id));
    });
  }

  toggleTask(id: string) {
    this.http.patch(`${this.api}/${id}`, {}).subscribe(() => {
      this.tasks.update(prev =>
        prev.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    });
  }
}