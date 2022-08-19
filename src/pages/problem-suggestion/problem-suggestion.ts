import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastProvider } from '../../providers/toast/toast';
import { EmailComposer } from '@ionic-native/email-composer';
import { BaseFormPage } from '../../shared/base-form/base.form.page';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-problem-suggestion',
  templateUrl: 'problem-suggestion.html',
})
export class ProblemSuggestionPage extends BaseFormPage {

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private emailComposer: EmailComposer,
    private toastCtrl: ToastProvider) {

    super();
    this.createForm();
  }

  ionViewDidLoad() {
  }

  submit() {
    let name = this.form.get('name').value;
    let subject = this.form.get('subject').value;
    let description = this.form.get('description').value;

    let email = {
      to: 'suporte@futuremotors.com.br',
      cc: [],
      bcc: [],
      attachments: [],
      subject: subject,
      body: description + '\n\n\n' + 'Usuário colaborador: ' + name,
      isHtml: false
    };

    this.emailComposer.open(email);
    this.toastCtrl.presentToast('Email composto com sucesso.', 1000, 'middle');
    this.navCtrl.push(HomePage);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      subject: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.maxLength(300)]]
    });
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }  
}
