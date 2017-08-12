import { RecordsService } from './records.service';
import { RecordsComponent } from './records.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [RecordsService],
  declarations: [RecordsComponent],
  exports: [RecordsComponent]
})

export class RecordsModule { }
