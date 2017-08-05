import { RecordsComponent } from './records/records.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [HomeComponent, UsersComponent, RecordsComponent],
  exports: [HomeComponent, UsersComponent, RecordsComponent]
})

export class HomeModule { }
