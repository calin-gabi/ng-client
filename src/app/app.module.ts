import { HttpModule } from '@angular/http';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    ComponentsModule
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
