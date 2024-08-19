import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../myService/supabase.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent implements OnInit {

  TaskList: any[] = [];
  groupedTasks: { [date: string]: any[] } = {};
  addTaskClick: boolean = false;
  
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.fetchData();
  
  }

  async fetchData() {
    try{
      const data = await this.supabaseService.fetchDataS();
    
      // console.log("success : ",data);
      this.TaskList = data as any[];
      this.groupTasksByDate();
      // console.log("lists : ",this.groupedTasks)
      // return data
    }
    catch(error){
      console.log("error : ",error)
      // return error
    }
  
  }

  groupTasksByDate() {
    this.groupedTasks = this.TaskList.reduce((group, task) => {
      const date = task.date;
      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(task);
      return group;
      
    }, {});
  }

  get dateTaskKeys(): string[] {
    return Object.keys(this.groupedTasks);
  }
  
  // logic for completing the task

  async completedOrNot(compTask: any) {
    // console.log("compTask ",compTask);

    if (compTask.completed){
      compTask.completed = false;
      try {
        const data = await this.supabaseService.completedOrNotS(compTask)
        // console.log("susccess", data);
      }catch(error) {
        console.log("error : ",error);
      }
      // console.log("compTask false",compTask);
    } else {
      compTask.completed = true;
      try {
        const data = await this.supabaseService.completedOrNotS(compTask)
        // console.log("susccess", data);
      }catch(error) {
        console.log("error : ",error);
      }
      // console.log("compTask true",compTask);
    }

  }

  progressBarUpdate(progGroupTask: any) {
    // console.log("progGroupTask ",progGroupTask.length);

    const TotTask = progGroupTask.length
    const Tcomplete = progGroupTask.filter((taskcomp: any) => taskcomp.completed).length;
    // console.log("progGroupTask ",Tcomplete);
    return TotTask > 0 ? `${(Tcomplete / TotTask) * 100}%` : '0%';

  }

  // retCheck(){
  //   if(this.supabaseService.isTaskAdded){
  //     this.fetchData();

  //   }
  // }

  // addTaskClicked() {

  //   this.closeModel = "open"
  //   this.addTaskClick = true

  // }
  
  //------------------ ADD task content ----------------------------//

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

  // closeModel: string = "open"
  

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
    console.log('Task added successfully: Addtask page ', data);

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
      console.log("task added sssss",this.supabaseService.isTaskAdded);
      this.fetchData();
      // this.closeModel = "modal"
    }

    }
    catch(error) {
      console.error('Error adding task:', error);
    }
  }

}
