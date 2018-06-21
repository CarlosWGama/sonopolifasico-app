import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCustomCycleModalPage } from './create-custom-cycle-modal';

@NgModule({
  declarations: [
    CreateCustomCycleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCustomCycleModalPage),
  ],
})
export class CreateCustomCycleModalPageModule {}
