import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register/register";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "ionic-angular";
//import { UrlUtil } from "../util/UrlUtil";

@Component({
  selector: 'page-login',
  templateUrl: 'Login.html'
})

export class LoginPage {

  username : string = "";
  password : string = "";

  constructor ( public navCtrl: NavController,
                private http:HttpClient,
                public toastCtrl: ToastController,
                //private storage: Storage,
                //private urlUtil: UrlUtil
  ) {

  }

  toTabs() {
    // this.navCtrl.setRoot(TabsPage);
    console.log(this.username);
    console.log(this.password);
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
    this.http.get('http://xyf.zbeboy.xyz/mobile/login', {
      params:{'username':username,'password':password}
    })
      .subscribe(data => {
        if(data['state']){
          this.navCtrl.setRoot(TabsPage);
        }else{
          const toast = this.toastCtrl.create({
            message: data['msg'],
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }

      });


    /*this.http.get(this.urlUtil.login,{
      params:{'username': username, 'password': password}
    })
      .subscribe(data => {
        if(data['state']){
          this.navCtrl.setRoot(TabsPage);
          this.addUser();
        }else{
          const toast = this.toastCtrl.create({
            message: data['msg'],
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });*/
  }

  toRegister()
  {
    this.navCtrl.setRoot(RegisterPage);
  }

}

