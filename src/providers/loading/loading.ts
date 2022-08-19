import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  loading: Loading;

  constructor(private loadingCtrl: LoadingController) { }

  present() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    return this.loading.present();
  }

  presentMessage(message: string) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: message
    });
    return this.loading.present();
  }

  presentLoading(content: string, duration: number) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: content,
      duration: duration
    });
    return this.loading.present();
  }

  dismiss() {
    return this.loading.dismiss();
  }
}
