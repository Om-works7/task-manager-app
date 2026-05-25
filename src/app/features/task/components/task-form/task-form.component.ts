  import { Component, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
  import { InputComponent } from '../../../../shared/components/input-component/input/input.component';


  @Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule,InputComponent],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css'
  })
  export class TaskFormComponent {

    private fb = new FormBuilder();

    
  ngOnInit() {
    console.log('Task form loaded!');
  }


    @Output() save = new EventEmitter<any>()
    @Output() close = new EventEmitter<void>()

    form = this.fb.group({
      title: [''],
      description: [''],
      priority: ['low']
    })

    onSubmit(){
      this.save.emit({
        id: crypto.randomUUID(),
        ...this.form.value,
        completed: false,
        createdAt: new Date()
      });
    }


  }

