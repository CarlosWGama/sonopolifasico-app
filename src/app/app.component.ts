import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translateService: TranslateService, private storage: Storage) {
    platform.ready().then(() => {
     
      translateService.setDefaultLang('en');
      this.storage.get("language").then(val => {
        if (val != null) translateService.use(val);
        
        this.rootPage = HomePage;
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }
}

