import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

/**
 * @author Carlos W. Gama
 * @since 1.0.0
 */

@IonicPage()
@Component({
  selector: 'page-option-menu',
  templateUrl: 'option-menu.html',
})
export class OptionMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionMenuPage');
  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
