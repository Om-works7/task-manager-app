import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightDirective } from "../../../../shared/directives/highlight/highlight.directive";
import { PriorityColorDirective } from '../../../../shared/directives/priority-color/priority-color.directive';
import { OnHoverHighlightDirective } from '../../../../shared/directives/on-hover-highlight/on-hover-highlight.directive';
import { DatePipe } from '@angular/common';
import { TaskStatusPipe } from '../../../../shared/pipes/status/task-status.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate/truncate.pipe';


@Component({
  selector: 'app-task-card',
  imports: [HighlightDirective, PriorityColorDirective,OnHoverHighlightDirective,DatePipe,TaskStatusPipe,TruncatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})

export class TaskCardComponent {
  
  @Input() task: any;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

}
