import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FromPageComponent } from './hello/from-page/from-page.component';
import { ToPageComponent } from './hello/to-page/to-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FromPageComponent,
    ToPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
        {path:'hello',component:FromPageComponent},
        {path: 'hello-to',component: ToPageComponent},
        {path:'',redirectTo:'/hello',pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
