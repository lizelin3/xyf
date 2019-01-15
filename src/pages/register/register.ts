import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController, Platform, NavParams} from 'ionic-angular';
import { LoginPage } from "../login/login";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

/*点击注册按钮*/
export class RegisterPage {

  username : string = "";
  password : string = "";
  confirmPassword : string = "";
  realName : string = "";

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              private http:HttpClient,
              ) {

  }

  gender: string = "f";

  goRegister() {

    //console.log(this.username);
    //console.log(this.password);
    //console.log(this.confirmPassword);
    //console.log(this.realName);
    //console.log(this.gender);

    let username = this.username.trim();
    let password = this.password.trim();
    let confirmPassword = this.confirmPassword.trim();
    let realName = this.realName.trim();
    let gender = this.gender.trim();

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
    if (confirmPassword === "") {
      const toast = this.toastCtrl.create({
        message: '请确认密码',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    if (password != confirmPassword) {
      const toast = this.toastCtrl.create({
        message: '两次输入密码不匹配',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    if (realName === "") {
      const toast = this.toastCtrl.create({
        message: '请输入姓名',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }

    //请求
    this.http.get('http://xyf.zbeboy.xyz/mobile/register', {
      params:{'username':username,'password':password, 'confirmPassword':confirmPassword, 'realName':realName, 'genre':gender }
    }).subscribe(data => {
      //console.log(data);
        if(data['state']) {
          const confirm = this.alertCtrl.create({
            title: '注册成功！'
          });
          confirm.present();
        }
      });


  }

  toLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}






