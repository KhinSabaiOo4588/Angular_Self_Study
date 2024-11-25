import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterpolationsComponent } from './interpolations/interpolations.component';
import { PropertiesComponent } from './properties/properties.component';
import { RouterModule } from '@angular/router';
import { UserWidgetComponent } from './properties/user-widget/user-widget.component';
import { AttrigutesComponent } from './attrigutes/attrigutes.component';
import { ClassesComponent } from './classes/classes.component';
import { StylesComponent } from './styles/styles.component';
import { EventsComponent } from './events/events.component';
import { TwoWayComponent } from './two-way/two-way.component';
import { MyInputComponent } from './two-way/my-input/my-input.component';

@NgModule({
  declarations: [
    AppComponent,
    InterpolationsComponent,
    PropertiesComponent,
    UserWidgetComponent,
    AttrigutesComponent,
    ClassesComponent,
    StylesComponent,
    EventsComponent,
    TwoWayComponent,
    MyInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'inter',component:InterpolationsComponent},
      {path:'props',component:PropertiesComponent},
      {path:'attrs',component:AttrigutesComponent},
      {path:'class',component:ClassesComponent},
      {path:'styles',component:StylesComponent},
      {path:'twoWay',component:TwoWayComponent},
      {path:'',redirectTo:'/inter',pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
