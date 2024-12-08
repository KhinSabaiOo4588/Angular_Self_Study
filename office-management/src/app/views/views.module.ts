import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewsComponent } from './views.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from './resource-management/resource-booking/resource.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ViewsRoutingModule,
    ResourceModule,
    ReactiveFormsModule,
    RouterModule,
    ViewsComponent,
    HttpClientModule,
    FormsModule

  ]
})
export class ViewsModule { }
