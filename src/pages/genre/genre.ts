import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { UrlUtil } from "../util/UrlUtil";
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html'
})
export class GenrePage {

  classifies: Array<any>;

  goodses: Array<any>;

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private urlUtil: UrlUtil,
    public toastCtrl: ToastController) {
    this.getClassifies();
    this.getGoods("0");
  }

  getClassifies() {
    //请求
    this.http.get(this.urlUtil.CLASSIFIIES)
      .subscribe(data => {
        if (data['state']) {
          this.classifies = data["listResult"];
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

  getGoods(classifyId: string) {
    //请求
    this.http.get(this.urlUtil.GOODS, {
      params: { 'classifyId': classifyId, 'goodsName': '' }
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

  selectGoods(classifyId: string) {
    this.getGoods(classifyId);
  }

  toDetail(goodsId: string) {
    this.navCtrl.push(DetailPage, {
      goodsId: goodsId
    });
  }

  onSearchKeyUp(event: any) {
    if ("Enter" == event.key) {
      this.navCtrl.push(SearchPage, {
        'content': event.target.value
      });
    }
  }
}
