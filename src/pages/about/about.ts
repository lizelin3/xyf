import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { EditPage } from "../edit/edit";
import { LoginPage } from "../login/login";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  username: string;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    public appCtrl: App
  ) {
    this.getUser();
  }

  toEditPage() {
    this.navCtrl.push(EditPage);
  }

  getUser() {
    this.storage.get('username').then((val) => {
      if (val == null) {
        this.appCtrl.getRootNav().setRoot(LoginPage);
        return;
      }
      this.username = val;
    });
  }


}
