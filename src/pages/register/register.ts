import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

import { UrlUtil } from "../util/UrlUtil";

import { LoginPage } from "../login/login";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

/*点击注册按钮*/
export class RegisterPage {

  realName: string = "";
  sex: string = "男";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private http: HttpClient,
    private urlUtil: UrlUtil
  ) {

  }

  toRegister() {

    let realName = this.realName.trim();
    let username = this.username.trim();
    let password = this.password.trim();
    let confirmPassword = this.confirmPassword.trim();

    if (realName === "") {
      const toast = this.toastCtrl.create({
        message: '请输入姓名',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    if (username === "") {
      const toast = this.toastCtrl.create({
        message: '请输入账号',
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

    if (confirmPassword === "") {
      const toast = this.toastCtrl.create({
        message: '请确认密码',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    if (password !== confirmPassword) {
      const toast = this.toastCtrl.create({
        message: '输入密码不一致',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }


    //请求
    this.http.get(this.urlUtil.REGISTER, {
      params: {
        'username': username,
        'password': password,
        'confirmPassword': confirmPassword,
        'realName': realName,
        'sex': this.sex
      }
    }).subscribe(data => {
      const toast = this.toastCtrl.create({
        message: data['msg'],
        duration: 3000,
        position: 'top'
      });
      toast.present();
      
      if (data['state']) {
        this.toLogin();
      }

    });


  }

  toLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}






