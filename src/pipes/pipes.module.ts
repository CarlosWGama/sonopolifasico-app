import { NgModule } from '@angular/core';
import { TimePipe } from './time/time';
import { DurationTimePipe } from './duration-time/duration-time';
@NgModule({
	declarations: [TimePipe,
    DurationTimePipe,
    DurationTimePipe],
	imports: [],
	exports: [TimePipe,
    DurationTimePipe]
})
export class PipesModule {}
