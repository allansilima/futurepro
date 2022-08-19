import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-simulator',
  templateUrl: 'simulator.html',
})
export class SimulatorPage {

  constructor(private navCtrl: NavController) {
  }

  ionViewCanEnter() {
  }

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
