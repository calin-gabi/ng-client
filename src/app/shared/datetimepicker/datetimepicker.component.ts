import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewEncapsulation, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./datetimepicker.component.scss']
})

export class DatetimepickerComponent implements OnInit, AfterViewInit {
  @Output() public onSelect: EventEmitter<any> = new EventEmitter();
  @Input() public momentDate: any;

  constructor(
    private _elementRef: ElementRef
  ) { }

  public openDateTimePicker() {
    const tag = this._elementRef.nativeElement;
    $(tag).find('.datetimepicker').datetimepicker('show');
  }

  ngAfterViewInit() {
    const tag = this._elementRef.nativeElement;
    $(tag).find('.datetimepicker').datetimepicker({
      format: 'M d Y H:i',
      onSelectDate: ((crt_date, event) => {
        event.value = crt_date;
        this.onSelect.next(crt_date);
      }),
      onSelectTime: ((crt_time, event) => {
        event.value = crt_time;
        this.onSelect.next(crt_time);
      })
    });
  }

  ngOnInit() {
  }

}
