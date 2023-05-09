import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnFormat'
})
export class SsnFormatPipe implements PipeTransform {

  transform(value: string): string {
    // Remove all non-digit characters from the string
    const cleaned = ('' + value).replace(/\D/g, '');

    // Match the cleaned value against the ssn number pattern
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    console.log(match);
    // If there is a match, format the ssn number
    if (match) {
      return  match[1] + '-' + match[2] + '-' + match[3];
    }

    // If there is no match, return the original value
    return value;
  }

}
