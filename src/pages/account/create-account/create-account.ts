import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user/user';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ToastProvider } from '../../../providers/toast/toast';
import { HomePage } from '../../home/home';
import { take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { User } from '../../../shared/models/user';
import { InspectionDocumentPage } from '../../inspection/inspection-document/inspection-document';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage extends BaseFormPage {

  userAuthenticated: User = null;
  sponsor_username: string = null;
  origin: any = '';
  cpfCnpj: string = null;
  maskCpfCnpj: string = '000.000.000-00';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private userProvider: UserProvider,
    private alertCtrl: AlertProvider,
    private loadingCtrl: LoadingProvider,
    private toastCtrl: ToastProvider,
    private storage: Storage) {

    super();
    this.createForm();
  }

  ionViewCanEnter() {
    this.storage.get('user').then(value => {
      let user: User = JSON.parse(JSON.stringify(value));
      if (user && user.active == 0) {
        this.navCtrl.setRoot(HomePage);
        this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Sua Conta não está ativa e não poderá realizar esta operação.`);
      }
    })
      .catch(error => {
        console.log(error);
        this.navCtrl.setRoot(HomePage);
      });
  }

  ionViewDidLoad() {
    this.setValues();
  }

  submit() {
    let account: any;
    account = JSON.parse(JSON.stringify(this.form.value));

    this.loadingCtrl.present();

    this.userProvider.createAccount(account)
      .pipe(take(1))
      .subscribe(
        data => {
          this.loadingCtrl.dismiss();
          if (data['status'] == 'SUCCESS') {
            this.toastCtrl.presentToast('Conta criada com sucesso.', 2000, 'bottom');
            this.navCtrl.push(HomePage);
          }
        },
        error => {
          this.loadingCtrl.dismiss();
          if (error.status == 400) {
            this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, this.setError(error));
          } else {
            this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, error.error.message);
          }
          return;
        }
      );
  }

  createForm() {
    this.form = this.formBuilder.group({
      sponsor_username: [null, [Validators.required, Validators.maxLength(255)]],
      cpf_cnpj: [null, [Validators.required, Validators.maxLength(18)]],
      username: [null, [Validators.required, Validators.maxLength(255)]],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.maxLength(255), Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  setValues() {
    if (this.navParams.get('cpfCnpj') != null && this.navParams.get('cpfCnpj') != undefined) {
      this.cpfCnpj = this.navParams.get('cpfCnpj');
      this.origin = 'inspectionDocument';
    }

    this.form.patchValue({
      cpf_cnpj: this.cpfCnpj
    });

    this.storage.get('user').then(value => {
      this.userAuthenticated = JSON.parse(JSON.stringify(value));
      this.form.patchValue({
        sponsor_username: this.userAuthenticated.login
      });
    })
      .catch(error => {
        console.log(error);
        this.userAuthenticated = null;
      });
  }

  setError(error: any) {
    let msgs: string[] = JSON.stringify(error.error['data'])
      .replace('{', '')
      .replace('}', '')
      .replace(':', ': ')
      .split(',');
    let message: any = '';
    msgs.forEach(msg => {
      message = `${message}\n${msg}`;
    });

    return message;
  }

  setMaskCpfCnpj(param: string) {
    console.log(param.length);
    if (param.length < 14) {
      this.maskCpfCnpj = '000.000.000-00';
    } else {
      this.maskCpfCnpj = '00.000.000/0000-00';
    }
  }

  goBack() {
    if (this.origin == 'inspectionDocument') {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
