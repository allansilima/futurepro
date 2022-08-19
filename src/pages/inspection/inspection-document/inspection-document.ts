import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';
import { LoadingProvider } from '../../../providers/loading/loading';
import { UserProvider } from '../../../providers/user/user';
import { take } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { InspectionRegisterPage } from '../inspection-register/inspection-register';
import { InspectionErrorDocumentPage } from '../inspection-error-document/inspection-error-document';
import { InspectionVideoPage } from '../inspection-video/inspection-video';

@IonicPage()
@Component({
  selector: 'page-inspection-document',
  templateUrl: 'inspection-document.html',
})
export class InspectionDocumentPage extends BaseFormPage implements OnDestroy {

  maskCpfCnpj: string = '000.000.000-99';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingProvider,
    private userProvider: UserProvider,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.createForm();
  }

  ionViewDidLoad() {
  }

  submit() {
    console.log('Submit inspection...');
  }

  createForm() {
    this.form = this.formBuilder.group({
      cpfCnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]]
    });
  }

  findByCpfCnpj() {
    let cpfCnpj: string = this.form.get('cpfCnpj').value;
    this.loadingCtrl.present();

    this.userProvider.findByCpfCnpj(cpfCnpj)
      .pipe(take(1))
      .subscribe(
        response => {
          this.loadingCtrl.dismiss();
          if (response['status'] == 'SUCCESS') {
            this.navCtrl.push(InspectionRegisterPage, { cpfCnpj: cpfCnpj });
          }
        },
        error => {
          this.loadingCtrl.dismiss();
          this.navCtrl.push(InspectionErrorDocumentPage, { cpfCnpj: cpfCnpj });
        }
      );
  }

  setMaskCpfCnpj(param: string) {
    if (param.length < 14) {
      this.maskCpfCnpj = '000.000.000-00';
    } else {
      this.maskCpfCnpj = '00.000.000/0000-00';
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  ngOnDestroy() {
  }
}
