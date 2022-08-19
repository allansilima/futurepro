import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { HomePage } from '../../home/home';
import { InspectionDocumentPage } from '../inspection-document/inspection-document';

@IonicPage()
@Component({
  selector: 'page-inspection-video',
  templateUrl: 'inspection-video.html',
})
export class InspectionVideoPage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private youtube: YoutubeVideoPlayer,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionVideoPage');
  }

  nextPage() {
    this.navCtrl.push(InspectionDocumentPage);
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  playVideoTutorial() {
    this.youtube.openVideo('kGWX54I4D4o');
  }
}
