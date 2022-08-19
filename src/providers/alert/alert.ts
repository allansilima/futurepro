import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(public alertCtrl: AlertController) { }

  presentAlert(title: string, subTitle: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      cssClass: 'alert',
      enableBackdropDismiss: false,
      buttons: ['OK']
    });
    alert.present();
  }

  presentConfirm(title: string, subtitle: string, message: string, option1: string, option2: string) {
    return new Promise((resolve) => {
      let confirm = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        message: message,
        cssClass: 'alert',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: option1,
            role: 'cancel',
            handler: () => {
              return resolve(false);
            }
          },
          {
            text: option2,
            handler: () => {
              return resolve(true);
            },
          },
        ]
      });

      confirm.present();
    });
  }

  presentConfirmUnique(title: string, subtitle: string, message: string, option: string) {
    return new Promise((resolve) => {
      let confirm = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        message: message,
        cssClass: 'alert',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: option,
            handler: () => {
              return resolve(true);
            },
          },
        ]
      });

      confirm.present();
    });
  }

}  
