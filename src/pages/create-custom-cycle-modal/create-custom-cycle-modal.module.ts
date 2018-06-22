import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCustomCycleModalPage } from './create-custom-cycle-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateCustomCycleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCustomCycleModalPage),
    TranslateModule.forChild()
  ],
})
export class CreateCustomCycleModalPageModule {}
