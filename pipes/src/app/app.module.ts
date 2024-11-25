import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeJa from '@angular/common/locales/ja';
import localeMy from '@angular/common/locales/my';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserNamePipe } from './user-name.pipe';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeJa);
// registerLocaleData(localeMy);

@NgModule({
  declarations: [
    AppComponent,
    UserNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,useValue:'EUR',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
