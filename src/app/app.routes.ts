import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/task/task.routes').then(m => m.TASK_ROUTES)
  }
];
