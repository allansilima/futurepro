import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { InspectionDocumentPage } from '../inspection/inspection-document/inspection-document';

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {
  lottieConfig: any;
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    LottieAnimationViewModule.forRoot();

    this.lottieConfig = {
      path: 'assets/lottie/error.json',
      autoplay: true,
      loop: false
    }
  }

  ionViewDidLoad() {
    this.message = this.navParams.get('message');
    console.log('ionViewDidLoad MessagePage');
  }

  goBack() {
    this.navCtrl.setRoot(InspectionDocumentPage);
  }
}
