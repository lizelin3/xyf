import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditPage } from "../edit/edit";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  username: string;
  constructor(public navCtrl: NavController,
    private storage: Storage
  ) {
    this.getUser();
  }

  toEditPage() {
    this.navCtrl.push(EditPage);
  }

  getUser() {
    this.storage.get('username').then((val) => {
      this.username = val;
    });
  }


}
