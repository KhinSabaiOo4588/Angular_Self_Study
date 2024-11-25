import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentsComponent } from './environments/environments.component';
import { HelloDirective } from './commons/hello.directive';
import { HelloComponent } from './views/hello/hello.component';
import { AttributesComponent } from './views/attributes/attributes.component';
import { RouterModule } from '@angular/router';
import { HightlightDirective } from './commons/hightlight.directive';
import { StructuralComponent } from './views/structural/structural.component';
import { AppForDirective } from './commons/app-for.directive';
import { NgIfDemoComponent } from './views/ng-if-demo/ng-if-demo.component';
import { AppCardComponent } from './commons/app-card/app-card.component';
import { NgSwitchDemoComponent } from './views/ng-switch-demo/ng-switch-demo.component';
import { NgForDemoComponent } from './views/ng-for-demo/ng-for-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentsComponent,
    HelloDirective,
    HelloComponent,
    AttributesComponent,
    HightlightDirective,
    StructuralComponent,
    AppForDirective,
    NgIfDemoComponent,
    AppCardComponent,
    NgSwitchDemoComponent,
    NgForDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'hello',component:HelloComponent},
      {path:'attr',component:AttributesComponent},
      {path:'stru',component:StructuralComponent},
      {path:'ngIf',component:NgIfDemoComponent},
      {path:'ngSwitch',component:NgSwitchDemoComponent},
      {path:'ngFor',component:NgForDemoComponent},
      {path:'',redirectTo:'/hello',pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
