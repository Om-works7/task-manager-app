import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/task/task.routes').then(m => m.TASK_ROUTES)
  }
];
