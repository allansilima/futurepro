import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  constructor(private navCtrl: NavController) {
  }

  ionViewDidLoad() {
  }

  playVideo() {
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
