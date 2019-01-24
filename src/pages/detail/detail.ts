import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { GenrePage } from "../genre/genre"

@Component({
  templateUrl: 'detail.html'
})
export class DetailPage {

  picUrl: string;
  goodsName:string;
  goodsBrief:string;

  constructor(private navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private urlUtil: UrlUtil,
    public toastCtrl: ToastController
  ) {
    this.getGoods();
  }

  toGenre() {
    this.navCtrl.setRoot(GenrePage);
  }

  getGoods() {
    let goodsId = this.navParams.get("goodsId");
    //请求
    this.http.get(this.urlUtil.GOODS_ONE + "/" + goodsId)
      .subscribe(data => {
        if (data['state']) {
          let goodsBean = data["goodsBeans"];
          this.picUrl = this.urlUtil.WEB_URL + goodsBean["picUrl"];
          this.goodsName = goodsBean["goodsName"];
          this.goodsBrief = goodsBean["goodsBrief"];
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
