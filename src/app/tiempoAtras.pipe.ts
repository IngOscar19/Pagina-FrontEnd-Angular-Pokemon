import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeBack'
})
export class TimempoAtrasPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'Fecha no disponible';

    const date = moment(value);
    const now = moment();
    const daysAgo = now.diff(date, 'days');

    if (daysAgo === 0) {
      return 'Hoy';
    } else if (daysAgo === 1) {
      return 'Hace 1 día';
    } else {
      return `Hace ${daysAgo} días`;
    }
  }
}
