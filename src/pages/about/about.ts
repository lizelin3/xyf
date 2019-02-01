import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { EditPage } from "../edit/edit";
import { LoginPage } from "../login/login";
import { Storage } from '@ionic/storage';
import { UrlUtil } from "../util/UrlUtil";
import { ToastController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  username: string;
  photo:string;

  constructor(public navCtrl: NavController,
    private storage: Storage,
    public appCtrl: App,
    private urlUtil: UrlUtil,
    private http: HttpClient,
    public toastCtrl: ToastController
  ) {
    this.getUser();
  }

  toEditPage() {
    this.navCtrl.push(EditPage);
  }

  getUser() {

    this.storage.get('username').then((username) => {
      this.storage.get('accessToken').then((accessToken) => {

        if (username == null || accessToken == null) {
          this.appCtrl.getRootNav().setRoot(LoginPage);
          return;
        }

        //请求
        this.http.get(this.urlUtil.USER, {
          params: { 'username': username, 'accessToken': accessToken }
        })
          .subscribe(data => {
            if (data['state']) {
              this.username = data["user"]["username"];
              this.photo = this.urlUtil.WEB_URL + data["user"]["photo"];
            } else {
              const toast = this.toastCtrl.create({
                message: data['msg'],
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }

          });
      });
    });
  }


}
