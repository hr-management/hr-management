import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    // Remove all non-digit characters from the string
    const cleaned = ('' + value).replace(/\D/g, '');

    // Match the cleaned value against the phone number pattern
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    // If there is a match, format the phone number
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    // If there is no match, return the original value
    return value;
  }

}
