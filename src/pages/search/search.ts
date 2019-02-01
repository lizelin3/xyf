import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { DetailPage } from '../detail/detail';

@Component({
  templateUrl: 'search.html'
})
export class SearchPage {
  goodsName: string;
  goodses: Array<any>;

  constructor(private navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private urlUtil: UrlUtil,
    public toastCtrl: ToastController
  ) {
    this.goodsName = this.navParams.get("content");
    this.getGoods(this.goodsName);
  }

  getGoods(goodsName: string) {
    //请求
    this.http.get(this.urlUtil.GOODS, {
      params: { 'classifyId': '0', 'goodsName': goodsName }
    })
      .subscribe(data => {
        if (data['state']) {
          this.goodses = data["listResult"];
          for (let i = 0; i < this.goodses.length; i++) {
            this.goodses[i]["picUrl"] = this.urlUtil.WEB_URL + this.goodses[i]["picUrl"];
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

  onSearchKeyUp(event: any) {
    this.getGoods(event.target.value);
  }

  toDetail(goodsId: string) {
    this.navCtrl.push(DetailPage, {
      goodsId: goodsId
    });
  }
}
