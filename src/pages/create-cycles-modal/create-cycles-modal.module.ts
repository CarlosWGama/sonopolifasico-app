import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCyclesModalPage } from './create-cycles-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateCyclesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCyclesModalPage),
    TranslateModule.forChild()
  ],
})
export class CreateCyclesModalPageModule {}
