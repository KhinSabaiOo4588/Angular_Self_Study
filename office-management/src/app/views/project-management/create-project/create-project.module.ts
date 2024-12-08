/* moeminoo */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path:'', component: CreateProjectComponent
    }])
  ]
})
export class CreateProjectModule { }
