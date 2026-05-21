import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  
  @Input() task: any;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

}
