import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordsFilter'
})
export class RecordsFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item) => {
      return item.description.toUpperCase().match(filter.toUpperCase());
    });
  }

}
