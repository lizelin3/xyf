import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banners: Array<any>;
  goodsSticks: Array<any>;

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private urlUtil: UrlUtil,
    public toastCtrl: ToastController
  ) {
    this.getBanners();
    this.getGoodsIsStick();
  }

  getBanners() {
    //请求
    this.http.get(this.urlUtil.BANNERS)
      .subscribe(data => {
        if (data['state']) {
          this.banners = data["listResult"];
          for (let i = 0; i < this.banners.length; i++) {
            this.banners[i]["bannerUrl"] = this.urlUtil.WEB_URL + this.banners[i]["bannerUrl"];
          }
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

  getGoodsIsStick() {
    //请求
    this.http.get(this.urlUtil.GOODS_STICK)
      .subscribe(data => {
        if (data['state']) {
          this.goodsSticks = data["listResult"];
          for (let i = 0; i < this.goodsSticks.length; i++) {
            this.goodsSticks[i]["picUrl"] = this.urlUtil.WEB_URL + this.goodsSticks[i]["picUrl"];
          }
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

  toDetail(goodsId: string) {
    this.navCtrl.push(DetailPage, {
      goodsId: goodsId
    });
  }
}

