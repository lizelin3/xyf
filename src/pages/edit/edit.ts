import { Component } from '@angular/core';
import { ModalController, AlertController, NavController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { AboutPage } from "../about/about";
import { ToastController } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'edit.html'

})
export class EditPage {
  username: string;
  accessToken: string;
  realName: string;
  sex: string;
  contact: string;
  address: string;

  constructor(public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
    public toastCtrl: ToastController,
    private storage: Storage,
    private urlUtil: UrlUtil
  ) {
    this.getUser();
  }

  Edit() {
    let alert = this.alertCtrl.create({
      title: '修改成功!',
      buttons: [
        {
          text: '重新登录',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  toabout() {
    this.navCtrl.setRoot(AboutPage)
  }

  getUser() {
    this.storage.get('username').then((username) => {
      this.storage.get('accessToken').then((accessToken) => {
        //请求
        this.http.get(this.urlUtil.USER, {
          params: { 'username': username, 'accessToken': accessToken }
        })
          .subscribe(data => {
            if (data['state']) {
              this.accessToken = data["user"]["accessToken"];
              this.username = data["user"]["username"];
              this.realName = data["user"]["realName"];
              this.sex = data["user"]["sex"];
              this.contact = data["user"]["contact"];
              this.address = data["user"]["address"];
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

  editRealName() {
    const prompt = this.alertCtrl.create({
      title: '您的姓名',
      inputs: [
        {
          name: 'realName',
          placeholder: '姓名',
          value: this.realName
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            //请求
            this.http.get(this.urlUtil.USER_REAL_NAME, {
              params: { 'username': this.username, 'accessToken': this.accessToken, 'realName': data['realName'] }
            })
              .subscribe(data => {
                if (data['state']) {
                  this.username = data["user"]["username"];
                  this.realName = data["user"]["realName"];
                  this.sex = data["user"]["sex"];
                  this.contact = data["user"]["contact"];
                  this.address = data["user"]["address"];
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
        }
      ]
    });
    prompt.present();
  }

  editContact() {
    const prompt = this.alertCtrl.create({
      title: '您的联系方式',
      inputs: [
        {
          name: 'contact',
          placeholder: '联系方式',
          value: this.contact
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            //请求
            this.http.get(this.urlUtil.USER_CONTACT, {
              params: { 'username': this.username, 'accessToken': this.accessToken, 'contact': data['contact'] }
            })
              .subscribe(data => {
                if (data['state']) {
                  this.contact = data["user"]["contact"];
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
        }
      ]
    });
    prompt.present();
  }

  editAddress() {
    const prompt = this.alertCtrl.create({
      title: '您的地址',
      inputs: [
        {
          name: 'address',
          placeholder: '地址',
          value: this.address
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            //请求
            this.http.get(this.urlUtil.USER_ADDRESS, {
              params: { 'username': this.username, 'accessToken': this.accessToken, 'address': data['address'] }
            })
              .subscribe(data => {
                if (data['state']) {
                  this.address = data["user"]["address"];
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
        }
      ]
    });
    prompt.present();
  }
}

