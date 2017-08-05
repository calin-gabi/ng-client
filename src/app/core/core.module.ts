import { Http } from '@angular/http';
import { LoginService } from './../components/login/login.service';
import { ApiDataHandler } from './api/api-data-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './../components/home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ ApiDataHandler, LoginService ],
  declarations: []
})

export class CoreModule { }
