import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastProvider } from '../../providers/toast/toast';
import { FileOpener } from '@ionic-native/file-opener';
import { FileProvider } from '../../providers/file/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-download',
  templateUrl: 'download.html',
})
export class DownloadPage {

  private files: any[] = [
    { title: 'Comunicado de acidente', url: this.fileProvider.file.applicationDirectory + 'www/assets/pdf/ancore_accident_report.pdf', name: 'ancore_accident_report.pdf', icon: 'assets/imgs/menu/document.svg' },
    { title: 'Termo de quitação', url: this.fileProvider.file.applicationDirectory + 'www/assets/pdf/ancore_discharge_term.pdf', name: 'ancore_discharge_term.pdf', icon: 'assets/imgs/menu/document.svg' },
    { title: 'Regulamento', url: this.fileProvider.file.applicationDirectory + 'www/assets/pdf/ancore_regulation.pdf', name: 'ancore_regulation.pdf', icon: 'assets/imgs/menu/document.svg' }]

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastProvider,
    private loadingCtrl: LoadingProvider,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private fileProvider: FileProvider) {
  }

  ionViewDidLoad() {
  }

  download(file: any) {
    let newUrl = this.fileProvider.path + 'download/' + file.title + '.pdf';
    let fileTransfer: FileTransferObject = this.transfer.create();

    this.loadingCtrl.presentMessage('Baixando arquivo...');
    fileTransfer.download(file.url, newUrl).then((entry) => {
      let url = entry.toURL();
      this.fileOpener.open(url, 'application/pdf')
        .then(() => this.toastCtrl.presentToast('Pronto!', 1000, 'bottom'))
        .catch(e => console.log(e));
    });
    this.loadingCtrl.dismiss();
  }

  goBack() {
    this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy() {
    this.fileProvider.file.removeDir(this.fileProvider.path, 'download')
      .then((ok) => console.log('Removed directory...'))
      .catch(e => console.log(e))
  }
}

