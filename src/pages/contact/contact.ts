import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  private contacts: any[] = [
    { name: 'Assistência 24 horas', phone: '0800 086 2121', icon: 'assets/imgs/menu/phone.svg' },
    { name: 'ANCORE', phone: '(62) 3293-6047', icon: 'assets/imgs/menu/phone.svg' },
    { name: 'Cadastro', phone: '(62) 9 9992-6600', icon: 'assets/imgs/menu/phone.svg' },
    { name: 'Boleto', phone: '(62) 9 9833-9222', icon: 'assets/imgs/menu/phone.svg' },
    { name: 'Sinistro', phone: '(62) 9 9622-5934', icon: 'assets/imgs/menu/phone.svg' },
    { name: 'Rastreador', phone: '(62) 9 9673-4232', icon: 'assets/imgs/menu/phone.svg' },
  ]

  constructor(
    private navCtrl: NavController,
    private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
  }

  callContact(number: string) {
    this.callNumber.callNumber(number, true)
      .then()
      .catch(error => console.log('Error call phone.\n', error));
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
