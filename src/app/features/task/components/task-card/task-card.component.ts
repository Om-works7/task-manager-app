import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightDirective } from "../../../../shared/directives/highlight/highlight.directive";
import { PriorityColorDirective } from '../../../../shared/directives/priority-color/priority-color.directive';
import { OnHoverHighlightDirective } from '../../../../shared/directives/on-hover-highlight/on-hover-highlight.directive';


@Component({
  selector: 'app-task-card',
  imports: [HighlightDirective, PriorityColorDirective,OnHoverHighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})

export class TaskCardComponent {
  
  @Input() task: any;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

}
