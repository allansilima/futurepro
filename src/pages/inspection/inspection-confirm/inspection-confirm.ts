import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InspectionRegisterPage } from '../inspection-register/inspection-register';
import { Inspection } from '../../../shared/models/inspection';
import { Media } from '../../../shared/models/media';
import { Photo } from '../../../shared/models/photo';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';
import { InspectionProvider } from '../../../providers/inspection/inspection';
import { MediaFile } from '@ionic-native/media-capture';
import { FileProvider } from '../../../providers/file/file';
import { HomePage } from '../../home/home';
import { S3Provider } from '../../../providers/s3/s3';
import { take, finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-inspection-confirm',
  templateUrl: 'inspection-confirm.html',
})
export class InspectionConfirmPage {

  inspection: Inspection = null;
  mediaFiles: MediaFile[] = [];
  media: Media[] = [];
  mediaVideo: Media;
  photos: Photo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingProvider,
    private alertCtrl: AlertProvider,
    private s3Provider: S3Provider,
    private inspectionProvider: InspectionProvider,
    private fileProvider: FileProvider,
    private storage: AngularFireStorage) {

    this.inspection = this.navParams.get('inspection');
    this.photos = this.navParams.get('photos');
    this.mediaFiles = this.navParams.get('mediaFiles');
  }

  ionViewDidLoad() {
  }

  confirm() {
    let date = new Date().toISOString().substring(0, 10);
    let plate = this.inspection.plate.toLocaleUpperCase();
    let pathStorage = 'inspection/' + plate + '/' + date + '/';
    this.media = [];

    this.loadingCtrl.presentMessage('Enviando fotos, aguarde...');

    this.photos.forEach(photo => {
      let path = pathStorage + 'photo/' + photo.name + '.jpg';
      let blob = this.fileProvider.base64ToBlob(photo.src.replace('data:image/jpeg;base64,', ''));
      let ref = this.storage.ref(path);

      let task = ref.put(blob);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(downloadUrl => {
              let file: Media = new Media(photo.name, 'image/jpeg', downloadUrl);
              this.media.push(file);
              //              if (this.media.length == this.photos.length) {
              //                this.inspection.media = this.media;
              //                this.update();
              //              }
            });
          })
        )
        .subscribe();
    });

    this.loadingCtrl.dismiss();
//    this.uploadVideo(pathStorage);
    this.insert();
  }

  insert() {
    this.loadingCtrl.presentMessage('Enviando vistoria, aguarde...');
    this.inspectionProvider.insert(this.inspection).pipe(take(1)).subscribe(
      response => {
        this.loadingCtrl.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.alertCtrl.presentAlert('Parabéns!', '', `Sua vistoria foi enviada com sucesso e já se encontra na fila de análise. Agora é só aguardar e acompanhar o status de sua vistoria em seu e-mail.`);
        //        this.inspection = response;
      },
      error => {
        this.loadingCtrl.dismiss();
        console.log(error);
        this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, 'Falha ao enviar vistoria.' + JSON.stringify(error));
        return;
      });
  }

  update() {
    this.inspectionProvider.update(this.inspection).pipe(take(1)).subscribe(
      response => {
        this.loadingCtrl.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.alertCtrl.presentAlert('Parabéns!', '', `Sua vistoria foi enviada com sucesso e já se encontra na fila de análise. Agora é só aguardar e acompanhar o status de sua vistoria em seu e-mail.`);
      },
      error => {
        this.loadingCtrl.dismiss();
        console.log(error);
        this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, 'Falha ao salvar fotos da vistoria.' + JSON.stringify(error));
        return;
      });
  }

  uploadPhotos() {
    /*
    this.loadingCtrl.presentMessage('Enviando fotos, aguarde...');

    this.photos.forEach(photo => {
      let path = pathStorage + 'photo/' + photo.name + '.jpg';
      let blob = this.fileProvider.base64ToBlob(photo.src.replace('data:image/jpeg;base64,', ''));
      let fileRef = this.storage.ref(path);
      alert('FileRef: ' + fileRef);

      let task = this.storage.upload(path, blob);

      task.then(upload => {
        upload.ref.getDownloadURL().then(url => {
          alert(url);
          let file: Media = new Media(photo.name, 'image/jpeg', url);
          this.media.push(file);
        });
      })
        .catch(error => {
          this.alertCtrl.presentAlert('Ops!', `\nDesculpe!`, `Erro ao tentar realizar upload da foto.`);
          console.log(error);
          return;
        });

      let uploadPercent = task.percentageChanges();
      alert(uploadPercent);

    });

    this.loadingCtrl.dismiss();
   */
  }

  uploadVideo(pathStorage: string) {
    let oldFilePath = this.mediaFiles[0].fullPath.split(this.mediaFiles[0].name)[0];
    let oldFileName = this.mediaFiles[0].name;
    let path = pathStorage + 'video/' + oldFileName;

    let ref = this.storage.ref(path);

    this.loadingCtrl.presentMessage('Enviando vídeo, aguarde...');

    this.fileProvider.file.readAsDataURL(oldFilePath, oldFileName)
      .then(base64 => {
        //let data = base64.replace('data:video/mp4;base64,', '');
        let blob = this.fileProvider.base64ToBlob(base64);
        let task = this.storage.upload(path, blob);
        //ref.put(data);
        alert('tipo: ' + this.mediaFiles[0].type);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(downloadUrl => {
                let file: Media = new Media(oldFileName, 'video/mp4', downloadUrl);
                this.media.push(file);
              });
            })
          )
          .subscribe();

          task.catch(error => {
            alert('error: ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.log('Error read file video', error);
      });

    this.loadingCtrl.dismiss();
  }

  /*
    uploadVideo(media: Media) {
      let oldFilePath = this.mediaFiles[0].fullPath.split(this.mediaFiles[0].name)[0];
      let oldFileName = this.mediaFiles[0].name;
  
      this.fileProvider.file.readAsDataURL(oldFilePath, oldFileName)
        .then(async (base64) => {
          let buffer = Buffer.from(base64.replace('data:video/mp4;base64,', ''), "base64");
          //        this.fireBaseProvider.upload(media.url, buffer);
          const success = await this.s3Provider.upload(buffer, media.type, media.url);
          console.log('Upload video success: ' + success);
        })
        .catch((error) => {
          console.log('Error read file video', error);
        });
    }
  */

  goBack() {
    this.navCtrl.setRoot(InspectionRegisterPage, { inspection: this.inspection, photos: this.photos, mediaFiles: this.mediaFiles });
  }
}


/*
       let buffer = Buffer.from(photo.src.replace('data:image/jpeg;base64,', ''), "base64");
         this.s3Provider.upload(buffer, media.type, media.url)
         .then(() => { })
         .catch((error) => {
           this.loadingCtrl.dismiss();
           console.error(error)
         });
 */
