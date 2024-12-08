import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase',
  standalone: true
})
export class CamelCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  }
}
