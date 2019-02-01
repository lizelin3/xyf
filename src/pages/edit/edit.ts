import { Component } from '@angular/core';
import { App, ModalController, AlertController, NavController, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
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
  photo: string;

  constructor(public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    private storage: Storage,
    public appCtrl: App,
    private urlUtil: UrlUtil,
    private imagePicker: ImagePicker,
    private transfer: FileTransfer
  ) {
    this.getUser();
  }

  toabout() {
    this.navCtrl.setRoot(AboutPage);
  }

  getUser() {
    this.storage.get('username').then((username) => {
      this.storage.get('accessToken').then((accessToken) => {

        if (username == null || accessToken == null) {
          this.viewCtrl.dismiss();
          this.appCtrl.getRootNav().setRoot(LoginPage);
          return;
        }

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

  editPhoto() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.transfer.create().upload(results[i], this.urlUtil.USER_PHOTO, {
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
          },
          params: {
            'username': this.username,
            'accessToken': this.accessToken
          }
        })
          .then((data) => {
            // success
            if (data['state']) {
              this.photo = this.urlUtil.WEB_URL + data["user"]["photo"];
            } else {
              const toast = this.toastCtrl.create({
                message: data['msg'],
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
          }, (err) => {
            // error
            const toast = this.toastCtrl.create({
              message: "上传失败 " + err.http_status + " " + err.exception,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
      }
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: '选择图片产生错误',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  editPassword() {
    const prompt = this.alertCtrl.create({
      title: '您的姓名',
      inputs: [
        {
          name: 'password',
          placeholder: '密码',
          type: 'password'
        },
        {
          name: 'okPassword',
          placeholder: '确认密码',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '保存',
          handler: data => {
            let password = data['password'];
            let okPassword = data['okPassword'];
            if (password.trim() === '') {
              const toast = this.toastCtrl.create({
                message: '密码不能为空',
                duration: 3000,
                position: 'top'
              });
              toast.present();
              return;
            }

            if (password.trim() !== okPassword.trim()) {
              const toast = this.toastCtrl.create({
                message: '请确认密码',
                duration: 3000,
                position: 'top'
              });
              toast.present();
              return;
            }

            //请求
            this.http.get(this.urlUtil.USER_PASSWORD, {
              params: { 'username': this.username, 'accessToken': this.accessToken, 'password': password }
            })
              .subscribe(data => {
                const toast = this.toastCtrl.create({
                  message: data['msg'],
                  duration: 3000,
                  position: 'top'
                });
                toast.present();

              });
          }
        }
      ]
    });
    prompt.present();
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
                  this.realName = data["user"]["realName"];
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

  editSex() {
    let alert = this.alertCtrl.create();
    alert.setTitle('您的性别');

    alert.addInput({
      type: 'radio',
      label: '男',
      value: '男',
      checked: this.sex == "男"
    });

    alert.addInput({
      type: 'radio',
      label: '女',
      value: '女',
      checked: this.sex == "女"
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        //请求
        this.http.get(this.urlUtil.USER_SEX, {
          params: { 'username': this.username, 'accessToken': this.accessToken, 'sex': data }
        })
          .subscribe(data => {
            if (data['state']) {
              this.sex = data["user"]["sex"];
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
    });

    alert.present()
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

  logout() {
    this.storage.remove('username');
    this.storage.remove('accessToken');
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}

