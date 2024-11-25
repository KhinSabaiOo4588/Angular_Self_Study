import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleStringChild } from './childs/simple-string';
import { ObjectValueChild } from './childs/object-value';
import { ArrayValueChild } from './childs/array-value';

@NgModule({
  declarations: [
    AppComponent,
    SimpleStringChild,
    ObjectValueChild,
    ArrayValueChild
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
