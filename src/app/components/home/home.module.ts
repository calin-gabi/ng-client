import { RecordsActions } from './records/records.actions';
import { UsersActions } from './users/users.actions';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    RecordsModule
  ],
  providers: [UsersActions, RecordsActions],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
