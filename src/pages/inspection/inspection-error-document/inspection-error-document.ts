import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InspectionDocumentPage } from '../inspection-document/inspection-document';
import { LottieAnimationViewModule } from 'ng-lottie';
import { CreateAccountPage } from '../../account/create-account/create-account';

@IonicPage()
@Component({
  selector: 'page-inspection-error-document',
  templateUrl: 'inspection-error-document.html',
})
export class InspectionErrorDocumentPage {

  lottieConfig: any;
  message: string = `Seu CPF/CNPJ não se encontra na nossa base de dados. É necessário efetuar o seu cadastro.`;
  cpfCnpj: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    LottieAnimationViewModule.forRoot();

    this.lottieConfig = {
      path: 'assets/lottie/not-found.json',
      autoplay: true,
      loop: false
    }
  }

  ionViewDidLoad() {
    this.cpfCnpj = this.navParams.get('cpfCnpj');
  }

  createAccount(){
    this.navCtrl.push(CreateAccountPage, { cpfCnpj: this.cpfCnpj });
  }

  goBack() {
    this.navCtrl.pop();
  }
}
