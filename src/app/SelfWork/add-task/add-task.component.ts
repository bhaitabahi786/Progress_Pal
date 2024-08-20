import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../myService/supabase.service';
import { TaskPageComponent } from '../task-page/task-page.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  task: any = {
    date: '',
    name: '',
    description: '',
    priority: 'low',
    group: 'learning',
    completed: false,
    otherGroup: ''
  };
  isOtherGroup: boolean = false;

  @Output() istaskAddClick = new EventEmitter<boolean>();

  constructor(private supabaseService: SupabaseService) {  }

  otherSelected(event : any){
    console.log("ebvent : ",event.target.value);

    if (event.target.value === "others"){
      this.isOtherGroup = true
    }else {
      this.isOtherGroup = false
    }

  }

  async addTask() {

    // console.log("add task list : ",this.task);
    if(this.isOtherGroup){
      this.task.group = this.task.otherGroup;
    }

    try{
    const data = await this.supabaseService.addTaskS(this.task);
    console.log('Task added successfully ', data);

    this.task = {
      date: '',
      name: '',
      description: '',
      priority: 'low',
      group: 'learning',
      completed: false,
      otherGroup: ''
    };
    this.isOtherGroup = false;

    if(this.supabaseService.isTaskAdded){
      console.log("task added sssss");
      this.istaskAddClick.emit(true)
    }

    }
    catch(error) {
      console.error('Error adding task:', error);
    }
  }

}
