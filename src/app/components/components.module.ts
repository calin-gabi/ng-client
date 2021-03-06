import { HomeResolver } from './home/home.resolver';
import { AnonymusGuard } from './../core/guards/anonymus-guard.service';
import { AuthGuard } from './../core/guards/auth-guard.service';
import { LoginActions } from './login/login.actions';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdFormFieldModule, MdFormField, MatButtonModule, MatInputModule } from '@angular/material';

export const ROUTES: Routes = [
  { path: '',
    canActivate: [AuthGuard] ,
    component: HomeComponent ,
    resolve: {
      homeResolver: HomeResolver
    }
  },
  { path: 'login', canActivate: [AnonymusGuard], component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MdFormFieldModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LoginActions, AuthGuard, AnonymusGuard, HomeResolver],
  exports: [RouterModule, HomeModule]
})
export class ComponentsModule { }
