import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionMenuPage } from './option-menu';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OptionMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionMenuPage),
    TranslateModule.forChild()
  ],
})
export class OptionMenuPageModule {}
