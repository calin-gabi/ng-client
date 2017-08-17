import { SharedModule } from './../../../shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    SharedModule
  ],
  providers: [UsersService],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})

export class UsersModule { }
