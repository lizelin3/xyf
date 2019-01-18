import { Component } from '@angular/core';
import { ModalController , AlertController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import {AboutPage} from "../about/about";
import { ToastController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'edit.html'

})
export class EditPage {
  username : string;
  realName : string;
  sex : string;
  contact : string;
  address : string;

  constructor(public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private navCtrl:NavController,
              private http:HttpClient,
              public toastCtrl: ToastController,
              private storage: Storage,
              private urlUtil: UrlUtil
  ) {
    this.getUser();
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

  getUser(){
    this.storage.get('username').then((val) => {
      //请求
      this.http.get(this.urlUtil.USER, {
        params:{'username':val}
      })
        .subscribe(data => {
          if(data['state']){
            this.username = data["user"]["username"];
            this.realName = data["user"]["realName"];
            this.sex = data["user"]["sex"];
            this.contact = data["user"]["contact"];
            this.address = data["user"]["address"];
          }else{
            const toast = this.toastCtrl.create({
              message: data['msg'],
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }

        });
    });


  }
}

