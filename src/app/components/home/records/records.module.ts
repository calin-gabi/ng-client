import { SharedModule } from './../../../shared/shared.module';
import { HomeModule } from './../home.module';
import { FormsModule } from '@angular/forms';
import { RecordsService } from './records.service';
import { RecordsComponent } from './records.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [RecordsService],
  declarations: [RecordsComponent],
  exports: [RecordsComponent]
})

export class RecordsModule { }
