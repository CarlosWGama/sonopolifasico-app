import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewCyclePageModule } from '../pages/new-cycle/new-cycle.module';
import { CreateCyclesModalPageModule } from '../pages/create-cycles-modal/create-cycles-modal.module';
import { CreateCustomCycleModalPageModule } from '../pages/create-custom-cycle-modal/create-custom-cycle-modal.module';
import { CycleProvider } from '../providers/cycle/cycle';
import { SQLite } from '@ionic-native/sqlite';
import { PipesModule } from '../pipes/pipes.module';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NewCyclePageModule,
    CreateCyclesModalPageModule,
    CreateCustomCycleModalPageModule,
    PipesModule
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
    AdMobFree
  ]
})
export class AppModule {}
