import { SharedModule } from './../../../shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    SharedModule,
    MatListModule
  ],
  providers: [UsersService],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})

export class UsersModule { }
