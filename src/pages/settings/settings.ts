import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * @author Carlos W. Gama
 * @since 1.0.0
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  language: string = "en";
  languages: {label: string, folder: string}[] = [
      {label: 'English', folder: 'en'}, 
      {label: 'Português', folder: 'pt-BR'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, private storage: Storage) {
    this.storage.get("language").then((val) => {
      if (val != null)  this.language = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  save() {
    this.storage.set("language", this.language);
    this.translate.use(this.language);
  }

}
