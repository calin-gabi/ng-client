import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  // @Output() public onSelect = new EventEmitter();
  // @Input() public momentDate: any = null;

  constructor() { }

  public onChange(date) {
    console.log(date);
    // this.onSelect.next(date);
  }

  ngOnInit() {
  }

}
