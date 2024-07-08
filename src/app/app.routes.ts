import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: AddTaskComponent },
    { path: 'add-task', component: AddTaskComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

