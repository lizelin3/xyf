import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EditPage} from "../edit/edit";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  toEditPage() {
    this.navCtrl.setRoot( EditPage );
  }

}
