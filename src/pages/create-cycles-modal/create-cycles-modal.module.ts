import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCyclesModalPage } from './create-cycles-modal';

@NgModule({
  declarations: [
    CreateCyclesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCyclesModalPage),
  ],
})
export class CreateCyclesModalPageModule {}
