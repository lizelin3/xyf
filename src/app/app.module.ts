import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { GenrePage } from '../pages/genre/genre';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from "../pages/detail/detail";
import { EditPage } from "../pages/edit/edit";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { SearchPage } from "../pages/search/search";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UrlUtil } from "../pages/util/UrlUtil";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    GenrePage,
    HomePage,
    TabsPage,
    DetailPage,
    EditPage,
    LoginPage,
    RegisterPage,
    SearchPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    GenrePage,
    HomePage,
    TabsPage,
    DetailPage,
    EditPage,
    LoginPage,
    RegisterPage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UrlUtil
  ]
})
export class AppModule {}
