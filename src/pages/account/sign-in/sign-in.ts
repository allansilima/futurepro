import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';
import { User } from '../../../shared/models/user';
import { UserProvider } from '../../../providers/user/user';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { HomePage } from '../../home/home';
import { take } from 'rxjs/operators';
import { RedefinePasswordPage } from '../redefine-password/redefine-password';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage extends BaseFormPage {

  private user: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private alertCtrl: AlertProvider,
    private loadingCtrl: LoadingProvider,
    private storage: Storage) {
    super();
    this.createForm();
  }

  ionViewDidLoad() {
  }

  submit() {
    let login = this.form.get('login').value;
    let password = this.form.get('password').value;

    this.loadingCtrl.present();
    this.userProvider.signIn(login, password)
      .pipe(take(1))
      .subscribe(
        response => {
          this.loadingCtrl.dismiss();
          if (response['status'] == 'SUCCESS') {
            this.user.login = response['data'].login;
            this.user.password = response['data'].password;
            this.user.email = response['data'].user.email;
            this.user.name = response['data'].user.name;
            this.user.document_cpf = response['data'].user.document_cpf;
            this.user.active = response['data'].user.active == true ? 1 : 0;
            if (this.form.get('remember')) {
              this.user.remember = 1;
            } else {
              this.user.remember = 0;
            }
            //this.userStorage.create(this.user);
            this.storage.set('user', this.user);
            this.navCtrl.push(this.navParams.get('page'));
          }
        },
        error => {
          this.loadingCtrl.dismiss();
          if (error.status == 400) {
            this.alertCtrl.presentAlert('Ops!', '', 'Email ou usuário e/ou senha inválidos.');
          } else {
            this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, error.error.message);
          }
          return;
        }
      );
  }

  createForm() {
    this.form = this.formBuilder.group({
      login: [null, [Validators.required, Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      remember: [1, Validators.required]
    });
  }

  onKeyup(param: string) {
    let value = param;
    this.form.patchValue({
      login: value.replace(' ', '').toLocaleLowerCase()
    });
  }

  goToRedefinePassword() {
    this.navCtrl.push(RedefinePasswordPage);
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}