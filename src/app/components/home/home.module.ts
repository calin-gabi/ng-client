import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { RecordsComponent } from './records/records.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    RecordsModule
  ],
  providers: [],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})

export class HomeModule { }
