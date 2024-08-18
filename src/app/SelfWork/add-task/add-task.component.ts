import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../myService/supabase.service';

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
    console.log('Task added successfully:Addtask page ', data);

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
    this.supabaseService.fetchDataS();  // this is not working 

    if(this.supabaseService.isTaskAdded){
      console.log("task added sssss")
    }

    }
    catch(error) {
      console.error('Error adding task:', error);
    }
  }

}
