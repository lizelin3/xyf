import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { ToastController } from "ionic-angular";

import { UrlUtil } from "../util/UrlUtil";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banners : Array<any>;

  constructor( public navCtrl: NavController,
               private http:HttpClient,
               private urlUtil: UrlUtil,
               public toastCtrl: ToastController
  ) {
    this.getBanners();
  }

  getBanners(){
     //请求
    this.http.get(this.urlUtil.BANNERS, )
      .subscribe(data => {
        if(data['state']){
         console.log(data);
         this.banners = data["listResult"];
         for(let i = 0;i<this.banners.length; i++){
           this.banners[i]["bannerUrl"] = this.urlUtil.WEB_URL + this.banners[i]["bannerUrl"];
         }
        }else{
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

