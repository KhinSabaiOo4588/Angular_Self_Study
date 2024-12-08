import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateResourceComponent } from '../create-resource/create-resource.component';
import { UpdateResourceComponent } from '../update-resource/update-resource.component';
import { ResourceBookingComponent } from './resource-booking.component';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { UpdateBookingComponent } from '../update-booking/update-booking.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ResourceBookingComponent
    },
    {
      path: 'create-resource',
      component: CreateResourceComponent  // Add route for create form
    },
    {
      path: 'update-resource/:id',
      component: UpdateResourceComponent
      },
      {
        path: 'booking/update-booking/:id',
        component: UpdateBookingComponent
      },
    {
      path: 'booking/create-booking',
      component: CreateBookingComponent
    },
  
    ])
  ]
})
export class ResourceModule { }
