import { RecordsComponent } from './records.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [RecordsComponent],
  exports: [RecordsComponent]
})

export class RecordsModule { }
