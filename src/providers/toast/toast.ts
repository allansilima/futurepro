import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) { }

  presentToast(message: string, duration: number, position: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }
}
