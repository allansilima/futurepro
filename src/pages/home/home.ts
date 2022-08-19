import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../account/profile/profile';
import { CreateAccountPage } from '../account/create-account/create-account';
import { BankSlipPage } from '../bank-slip/bank-slip';
import { ContactPage } from '../contact/contact';
import { DownloadPage } from '../download/download';
import { TutorialPage } from '../tutorial/tutorial';
import { SignInPage } from '../account/sign-in/sign-in';
import { ProblemSuggestionPage } from '../problem-suggestion/problem-suggestion';
import { InspectionListPage } from '../inspection/inspection-list/inspection-list';
import { SimulatorPage } from '../simulator/simulator';
import { User } from '../../shared/models/user';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading/loading';
import { InspectionVideoPage } from '../inspection/inspection-video/inspection-video';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: User[] = [];

  pages: any[] = [
    { title: 'Nova vistoria', page: InspectionVideoPage, icon: 'assets/imgs/menu/add_inspection.svg', authenticate: true },
    { title: 'Criar nova conta', page: CreateAccountPage, icon: 'assets/imgs/menu/add_user.svg', authenticate: true },
    { title: 'Simulador de plano', page: SimulatorPage, icon: 'assets/imgs/menu/calculator.svg', authenticate: true },
    { title: '2ª via de boleto', page: BankSlipPage, icon: 'assets/imgs/menu/bank_slip.svg', authenticate: true },
    { title: 'Lista de vistorias', page: InspectionListPage, icon: 'assets/imgs/menu/view_inspection.svg', authenticate: true },
    { title: 'Download de documento', page: DownloadPage, icon: 'assets/imgs/menu/document.svg', authenticate: false },
    { title: 'Assistência 24h / Telefones úteis', page: ContactPage, icon: 'assets/imgs/menu/phone.svg', authenticate: false },
    { title: 'Tutorial de treinamento', page: TutorialPage, icon: 'assets/imgs/menu/tutorial.svg', authenticate: false },
    { title: 'Problema / Sugestão', page: ProblemSuggestionPage, icon: 'assets/imgs/menu/bug_solutions.svg', authenticate: false }
  ];

  userAuthenticated: User = null;

  constructor(
    private navCtrl: NavController,
    public storage: Storage,
    public loadingCtrl: LoadingProvider) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then(value => {
      this.userAuthenticated = JSON.parse(JSON.stringify(value));
    })
      .catch(error => {
        console.log(error);
        this.userAuthenticated = null;
      });
  }

  openPage(page: any, authenticate: boolean) {
    if (!authenticate || this.isAuthenticated()) {
      this.navCtrl.push(page);
    } else {
      this.navCtrl.push(SignInPage, { page: page });
    }
  }

  goToProfile() {
    this.openPage(ProfilePage, true);
  }

  isAuthenticated() {
    return this.userAuthenticated != null;
  }

  signOut() {
    this.loadingCtrl.presentLoading('', 200);
    this.userAuthenticated = null;
    this.storage.clear();
  }
}
