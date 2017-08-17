import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [],
  declarations: [DatetimepickerComponent],
  exports: [DatetimepickerComponent]
})

export class SharedModule { }
