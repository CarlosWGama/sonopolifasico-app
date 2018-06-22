import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCyclePage } from './new-cycle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewCyclePage,
  ],
  imports: [
    IonicPageModule.forChild(NewCyclePage),
    TranslateModule.forChild()
  ],
})
export class NewCyclePageModule {}
