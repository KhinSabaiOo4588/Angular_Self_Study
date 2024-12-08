/* moeminoo */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectListComponent } from './project-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProjectListComponent
    },
    {
      path: 'create-project',
      component: CreateProjectComponent  // Add route for create form
    },
    {
      path: 'update-project/:id/:mode',
      component: UpdateProjectComponent
    }])
  ]
})
export class ProjectModule { }
