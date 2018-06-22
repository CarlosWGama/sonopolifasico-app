import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewCyclePageModule } from '../pages/new-cycle/new-cycle.module';
import { CreateCyclesModalPageModule } from '../pages/create-cycles-modal/create-cycles-modal.module';
import { CreateCustomCycleModalPageModule } from '../pages/create-custom-cycle-modal/create-custom-cycle-modal.module';
import { CycleProvider } from '../providers/cycle/cycle';
import { SQLite } from '@ionic-native/sqlite';
import { PipesModule } from '../pipes/pipes.module';
import { AdMobFree } from '@ionic-native/admob-free';
import { OptionMenuPageModule } from '../pages/option-menu/option-menu.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { createTranslateLoader } from '../providers/create-translate-loader/create-translate-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NewCyclePageModule,
    CreateCyclesModalPageModule,
    CreateCustomCycleModalPageModule,
    OptionMenuPageModule,
    SettingsPageModule,
    PipesModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CycleProvider,
    SQLite,
    AdMobFree  ]
})
export class AppModule {}
