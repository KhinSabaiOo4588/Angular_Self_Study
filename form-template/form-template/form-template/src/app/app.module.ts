import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ForbitNameDirective } from './app-commons/forbit-name.directive';
import { ModalDialogComponent } from './app-commons/modal-dialog/modal-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbitNameDirective,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
