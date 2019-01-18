import { Component } from '@angular/core';
import { ModalController , AlertController, NavController } from 'ionic-angular';
import { GenrePage } from "../genre/genre"

@Component({
  templateUrl: 'detail.html'
})
export class DetailPage {
  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController, private navCtrl: NavController) {
  }

  toGenre(){
    this.navCtrl.setRoot( GenrePage );
  }
}
