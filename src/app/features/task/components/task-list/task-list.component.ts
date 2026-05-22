import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';
import { TaskCardComponent } from "../task-card/task-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent, CommonModule ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

}
