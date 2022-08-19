import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseFormPage } from '../../shared/base-form/base.form.page';

@IonicPage()
@Component({
  selector: 'page-bank-slip',
  templateUrl: 'bank-slip.html',
})
export class BankSlipPage extends BaseFormPage implements OnDestroy {

  form: FormGroup;
  maskCpfCnpj = '000.000.000-00';
  
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {

    super();
    this.createForm();
  }

  ionViewCanEnter() {
  }

  ionViewDidLoad() {
  }

  submit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      cpfCnpj: [null, [Validators.required, Validators.maxLength(18)]],
    });
  }

  findByCpfCnpj() {
  }

  setMaskCpfCnpj(param: string) {
    if (param.length < 11) {
      this.maskCpfCnpj = '000.000.000-00';
    } else {
      this.maskCpfCnpj = '00.000.000/0000-00';
    }
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy() {
  }
}
