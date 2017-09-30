import { LocalStorageService } from './local-storage.service';
import { StoreModule } from './store/store.module';
import { Http } from '@angular/http';
import { LoginService } from './../components/login/login.service';
import { ApiDataHandler } from './api/api-data-handler';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './../components/home/home.component';

// const gapiClientConfig: any = {
//   clientId: '252899479655-aclf4njds8994sqe9q5trh7d5p5hivio.apps.googleusercontent.com',
//   scope: 'profile email'
// }

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot()
  ],
  exports: [
    StoreModule
  ],
  providers: [ ApiDataHandler, LoginService, LocalStorageService ],
  declarations: []
})

export class CoreModule { }
