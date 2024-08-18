import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    console.log("connection : ",this.supabase)
  }

  isTaskAdded: boolean = false;

  async fetchDataS() {
    try{
      const { data } = await this.supabase.from('tasks').select()
      console.log("success : ",data)
      return data
    }
    catch(error){
      console.log("error : ",error)
      return error
    }
  
  }

  async completedOrNotS(compTask: any) {
    console.log("compTask ",compTask);

      try {
        const { data } = await this.supabase.from('tasks').update({ completed: compTask.completed }).eq('id', compTask.id);
        // console.log("susccess", data);
      }catch(error) {
        console.log("error : ",error);
      }
  }


  async addTaskS(newTask: any) {

    // console.log("add task list : ",this.task);
    try{
    const data = await this.supabase.from('tasks').insert([newTask]).select();
    console.log('Task added successfully: ', data);
    this.succesRet(data);

    }
    catch(error) {
      console.error('Error adding task:', error);
    }
  }

  succesRet(taskData: any){
    if(taskData.status==201){
      this.isTaskAdded = true;
    }
  }

}
