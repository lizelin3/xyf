import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { AboutPage } from '../pages/about/about';
import { GenrePage } from '../pages/genre/genre';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { DetailPage } from '../pages/detail/detail';
import { EditPage } from '../pages/edit/edit';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
