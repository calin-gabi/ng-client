import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  declarations: [DatetimepickerComponent],
  exports: [DatetimepickerComponent]
})

export class SharedModule { }
