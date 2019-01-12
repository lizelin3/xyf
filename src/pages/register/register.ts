import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from "../login/login"

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

/*点击注册按钮*/
export class RegisterPage {

  constructor ( private alertCtrl: AlertController, public navCtrl: NavController){

  }

  gender: string = "f";

  presentConfirm()
  {
    let alert = this.alertCtrl.create({
      title: '注册成功!',
      buttons: [
        {
          text:'登录',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text:'取消',
          role:'cancel',
          handler: () => {
            console.log('cancle clicked');
          }
        }
      ]
    });
    alert.present();
  }

  toLogin()
  {
    this.navCtrl.setRoot( LoginPage );
  }

}

