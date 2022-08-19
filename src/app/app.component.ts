import { Component } from '@angular/core';
import { Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private app: App) {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.platform.registerBackButtonAction(() => {
      this.confirmBackExit();
    });
  }

  ionViewDidLoad() {
  }

  confirmBackExit() {
    let nav = this.app.getActiveNavs()[0];
    let message: string = '';
    let text: string = '';

    if (nav.canGoBack()) {
      message = 'Deseja realmente voltar?';
      text = 'Voltar';
    } else {
      message = 'Deseja realmente sair?';
      text = 'Sair';
    }

    const confirm = this.alertCtrl.create({
      title: 'Future Pro',
      message: message,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: text,
        handler: () => {
          if (nav.canGoBack()) {
            nav.pop();
          } else {
            this.platform.exitApp();
          }
        }
      }]
    });
    confirm.present();
  }

  ngOnDestroy(): void {
  }
}