import { Pipe, PipeTransform } from '@angular/core';

/**
 * @author Carlos W. Gama
 * @since 1.0.0
 */
@Pipe({
  name: 'durationTime',
})
export class DurationTimePipe implements PipeTransform {
 
  transform(value: string, ...args) {
    let text: string = '';
    let hours = Math.floor(Number(value) / 60);
    let minutes = Number(value) % 60;

    if (hours > 0)  
      text = hours + "h ";
    
    if (minutes > 0) 
      text += minutes + "m";

    return text;
  }
}
