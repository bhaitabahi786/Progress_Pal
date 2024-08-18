import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './SelfWork/add-task/add-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { NgModule } from '@angular/core';
import { TaskPageComponent } from './SelfWork/task-page/task-page.component';

export const routes: Routes = [
    // { path: '', component: TaskListComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: '', component: TaskPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

