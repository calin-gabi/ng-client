import { SharedModule } from './../../../shared/shared.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { HomeModule } from './../home.module';
import { FormsModule } from '@angular/forms';
import { RecordsService } from './records.service';
import { RecordsComponent } from './records.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsFilterPipe } from './records-filter.pipe';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFontAwesomeModule,
    MatListModule
  ],
  providers: [RecordsService],
  declarations: [RecordsComponent,
    RecordsFilterPipe
],
  exports: [RecordsComponent]
})

export class RecordsModule { }
