import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from "ionic-angular";

import { HttpClient } from "@angular/common/http";

import { UrlUtil } from "../util/UrlUtil";

import { Storage } from '@ionic/storage';
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  username: string = "govern";
  password: string = "MUt6N8ha";

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    public toastCtrl: ToastController,
    private storage: Storage,
    private urlUtil: UrlUtil
  ) {

  }

  toLogin() {
    let username = this.username.trim();
    let password = this.password.trim();
    if (username === "") {
      const toast = this.toastCtrl.create({
        message: '请输入用户名',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    if (password === "") {
      const toast = this.toastCtrl.create({
        message: '请输入密码',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    //请求
    this.http.get(this.urlUtil.LOGIN, {
      params: { 'username': username, 'password': password }
    })
      .subscribe(data => {
        if (data['state']) {
          this.storage.set('username', this.username);
          this.storage.set('accessToken', data['access_token']);
          this.navCtrl.setRoot(TabsPage);
        } else {
          const toast = this.toastCtrl.create({
            message: data['msg'],
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }

      });
  }

  toRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

  toTabs(){
    this.navCtrl.setRoot(TabsPage);
  }

  getUsers() {
    this.storage.get('username').then((val) => {
      console.log('Your username is', val);
    });

    this.storage.get('password').then((val) => {
      console.log('Your password is', val);
    });
  }

}

