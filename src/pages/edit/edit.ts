import { Component } from '@angular/core';
import { ModalController , AlertController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import {AboutPage} from "../about/about";

@Component({
  templateUrl: 'edit.html'

})
export class EditPage {
  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController, private navCtrl:NavController) {

  }

  Edit()
  {
    let alert = this.alertCtrl.create({
      title: '修改成功!',
      buttons: [
        {
          text:'重新登录',
          handler: () => {
            this.navCtrl.setRoot( LoginPage );
          }
        }
      ]
    });
    alert.present();
  }

  toabout(){
    this.navCtrl.setRoot(AboutPage)
  }

}

