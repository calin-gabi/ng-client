import { SharedModule } from './shared/shared.module';
import * as jQuery from 'jquery';
import { HttpModule } from '@angular/http';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AppComponent } from './app.component';

import { ENV_PROVIDERS } from './../environments/environment';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpModule,
    ComponentsModule,
    FormsModule,
    AngularFontAwesomeModule,
    SharedModule
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
