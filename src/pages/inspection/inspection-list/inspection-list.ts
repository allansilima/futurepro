import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../../home/home';
import { LoadingProvider } from '../../../providers/loading/loading';
import { InspectionProvider } from '../../../providers/inspection/inspection';
import { InspectionList } from '../../../shared/models/inspectionList';
import { take } from 'rxjs/operators';
import { AlertProvider } from '../../../providers/alert/alert';
import { User } from '../../../shared/models/user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-inspection-list',
  templateUrl: 'inspection-list.html'
})

export class InspectionListPage {

  inspectionList: InspectionList[] = [];
  inspectionPage: InspectionList[] = [];
  searchQuery: string = '';
  limitPerPage = 20;
  registerNumber = 0;
  viewedRegisterNumber = 0;
  search: boolean = false;
  userAuthenticated: User = null;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingProvider,
    private alertCtrl: AlertProvider,
    private inspectionProvider: InspectionProvider,
    private storage: Storage) {
  }

  ionViewCanEnter() {
    this.storage.get('user').then(value => {
      let user = JSON.parse(JSON.stringify(value));
      this.getInspections(user.login);
    })
      .catch(error => {
        console.log(error);
        this.userAuthenticated = null;
      });
  }

  ionViewDidLoad() {
  }

  getInspections(login: string) {
    this.loadingCtrl.presentMessage('Buscando suas vistorias, aguarde...');
    this.inspectionProvider.getInspections(login).pipe(take(1)).subscribe(
      inspections => {
        this.inspectionList = inspections['data'];
        this.registerNumber = this.inspectionList.length;
        if (this.registerNumber == 0) {
          this.alertCtrl.presentAlert('Ops!', '', `Você ainda não realizou nenhuma vistoria.`);
          return;
        }
        this.getTopInspections();
      }
    );
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 1000);
  }

  getTopInspections() {
    for (let i = this.viewedRegisterNumber; i < this.limitPerPage && i < this.inspectionList.length; i++) {
      this.inspectionPage.push(this.inspectionList[i]);
      this.viewedRegisterNumber += 1;
    }
  }

  doInfinite(infiniteScroll) {
    this.limitPerPage += 10;
    setTimeout(() => {
      this.getTopInspections();
      infiniteScroll.complete();
    }, 500);
  }

  showSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  inspectionSearch(ev: any) {
    this.getTopInspections();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.inspectionList = this.inspectionList.filter((i) => {
        return (i.attributes.status.toLowerCase().indexOf(val.toLowerCase()) > -1
          || i.attributes.plate.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      })

      this.viewedRegisterNumber = 0;
      this.getTopInspections();
    }
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }
}
