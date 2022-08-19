import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user/user';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';

@IonicPage()
@Component({
  selector: 'page-redefine-password',
  templateUrl: 'redefine-password.html',
})
export class RedefinePasswordPage extends BaseFormPage {

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private alertCtrl: AlertProvider,
    private loadingCtrl: LoadingProvider) {

    super();
    this.createForm();
  }

  ionViewDidLoad() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.maxLength(255), Validators.email]]
    });
  }

  submit() {
    let email = this.form.get('email').value;

    this.loadingCtrl.present();
    this.userProvider.redefinePassword(email)
      .pipe(take(1))
      .subscribe(
        data => {
          this.loadingCtrl.dismiss();
          if (data['status'] == 'SUCCESS') {
            this.alertCtrl.presentAlert('Pronto!', '', 'Senha redefinida e enviada para o email.');
            this.navCtrl.pop();
          }
        },
        error => {
          this.loadingCtrl.dismiss();
          this.alertCtrl.presentAlert('Ops!', '', 'Erro ao tentar redefinir senha.');
          return;
        }
      );
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}