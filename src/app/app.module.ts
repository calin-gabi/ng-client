import * as jQuery from 'jquery';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@angular/http';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AppComponent } from './app.component';

import { ENV_PROVIDERS } from './../environments/environment';
import { CoreModule } from './core/core.module';

import { Angular2SocialLoginModule } from 'angular2-social-login';

const providers = {
  'google': {
    'clientId': '252899479655-aclf4njds8994sqe9q5trh7d5p5hivio.apps.googleusercontent.com'
  }
/*
  ,
  'linkedin': {
    'clientId': 'LINKEDIN_CLIENT_ID'
  },
  'facebook': {
    'clientId': 'FACEBOOK_CLIENT_ID',
    'apiVersion': 'v2.4' // like v2.4
  }
*/
};

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
    SharedModule,
    Angular2SocialLoginModule
  ],
  providers: [
    ENV_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
