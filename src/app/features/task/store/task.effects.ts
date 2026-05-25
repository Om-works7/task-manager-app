import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { TaskService } from '../../../core/services/task/task.service';
import { map, switchMap } from 'rxjs';

@Injectable()
export class TaskEffects {

  private actions$ = inject(Actions);
  private taskService = inject(TaskService);


  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks }))
        )
      )
    )
  );


  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(action =>
        this.taskService.addTask(action.task).pipe(
          map(task => TaskActions.addTaskSuccess({ task }))
        )
      )
    )
  );


  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(action =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id: action.id }))
        )
      )
    )
  );

  toggleTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.toggleTask),
      switchMap(action =>
        this.taskService.toggleTask(action.id).pipe(
          map(() => TaskActions.toggleTaskSuccess({ id: action.id }))
        )
      )
    )
  );
}