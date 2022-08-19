import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { ToastProvider } from '../toast/toast';
import { Platform } from 'ionic-angular';


@Injectable()
export class FileProvider {
  public path: string = '';

  constructor(
    public http: HttpClient,
    public file: File,
    private toastCtrl: ToastProvider,
    private platform: Platform
  ) {
    if (this.platform.is('android')) {
    //  this.path = this.file.externalRootDirectory;
      this.path = this.file.dataDirectory;
    } else if (this.platform.is('ios')) {
      this.path = this.file.documentsDirectory;
    }

    this.checkDir(this.path, 'media');
  }

  checkDir(path: string, folder: string) {
    this.file.checkDir(path, folder).then(
      ok => {
        this.file.removeRecursively(path, folder);
        console.log('Remove Recursively...' + ok)
      })
      .catch(error => {
        console.log('Directory not exists...' + error);
        this.createDir(path, folder);
      });
  }

  createDir(path: string, folder: string) {
    this.file.createDir(path, folder, false).then(ok => {
      console.log('Directory created...' + ok);
    }).catch(error => {
      this.toastCtrl.presentToast('Erro ao tentar criar o diretório ' + folder + '.', 2000, 'bottom');
      console.log('Directory not created...' + JSON.stringify(error));
    });
  }

  moveFile(oldPath: string, oldFileName: string, newPath: string, newFileName: string) {
    this.file.removeFile(newPath, newFileName).then((ok) => {
      console.log("File removed...", ok);
    }).catch((error) => {
      console.log("Error on the move file...", error);
    })

    this.file.moveFile(oldPath, oldFileName, newPath, newFileName).then((ok) => {
      console.log("File moved...", ok);

    }).catch((error) => {
      this.toastCtrl.presentToast('Erro ao tentar salvar arquivo.', 2000, 'bottom');
      console.log("Error on the move file...", error);
    })
  }

  writeFile(path: string, fileName: string, text: any, whether: any) {
    this.file.writeFile(path, fileName, text, whether).then((ok) => {
      console.log("File created...", ok);
    }).catch((error) => {
      this.toastCtrl.presentToast('Erro ao tentar criar arquivo.', 2000, 'bottom');
      console.log("Error on the create file...", error);
    })
  }

  base64ToBlob(base64: any) {
    let byteString = atob(base64);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

}
