import { Pipe, PipeTransform } from '@angular/core';
import { PunchType } from '../enums/PunchType';

@Pipe({
  name: 'punchType'
})
export class PunchTypePipe implements PipeTransform {

  transform(value: number): string {
    return Object.values(PunchType)[value].toString()
  }

}
