import { FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [UsersService],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})

export class UsersModule { }
