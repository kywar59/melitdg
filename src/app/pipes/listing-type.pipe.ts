import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listingType'
})
export class ListingTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'Gratuita' || value === 'Clásico' || value === 'Premium') {
      return value;
    }


  }

}
