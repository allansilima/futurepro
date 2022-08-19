import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { BaseFormPage } from '../../../shared/base-form/base.form.page';
import { HomePage } from '../../home/home';
import { User } from '../../../shared/models/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage extends BaseFormPage {
  userAuthenticated: User = null;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage) {

    super();
    this.createForm();
  }

  ionViewCanEnter() {
  }

  ionViewDidLoad() {
    this.setValues();
  }

  submit() { }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null],
      login: [null],
      email: [null],
      cpf: [null],
      status: [null]
    });
  }

  setValues() {
    this.storage.get('user').then(value => {
      this.userAuthenticated = JSON.parse(JSON.stringify(value));
      this.form.patchValue({
        name: this.userAuthenticated.name,
        login: this.userAuthenticated.login,
        email: this.userAuthenticated.email,
        cpf: this.userAuthenticated.document_cpf,
        status: this.userAuthenticated.active == 1 ? 'Ativo' : 'Inativo'
      });
    })
      .catch(error => {
        console.log(error);
        this.userAuthenticated = null;
      });
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}