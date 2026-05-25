import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../shared/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private api = 'http://localhost:3000/tasks';

  tasks = signal<Task[]>([]);
  tasks$ = this.tasks;

  constructor(private http: HttpClient) {}

  
  getTasks() {
    return this.http.get<Task[]>(this.api);
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.api, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  toggleTask(id: string) {
    return this.http.patch(`${this.api}/${id}`, {});
  }


  // loadTasks() {
  //   this.http.get<Task[]>(this.api).subscribe(data => {
  //     this.tasks.set(data);
  //   });
  // }
  
  // addTask(task: Task) {
  //   this.http.post<Task>(this.api, task).subscribe(newTask => {
  //     this.tasks.update(prev => [...prev, newTask]);
  //   });
  // }

  // deleteTask(id: string) {
  //   this.http.delete(`${this.api}/${id}`).subscribe(() => {
  //     this.tasks.update(prev => prev.filter(t => t.id !== id));
  //   });
  // }

  // toggleTask(id: string) {
  //   this.http.patch(`${this.api}/${id}`, {}).subscribe(() => {
  //     this.tasks.update(prev =>
  //       prev.map(t =>
  //         t.id === id ? { ...t, completed: !t.completed } : t
  //       )
  //     );
  //   });
  // }
}