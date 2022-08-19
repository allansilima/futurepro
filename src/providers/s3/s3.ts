import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileProvider } from '../file/file';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class S3Provider {

  ACCESS_KEY_ID = 'AKIA2NK3WFTTTZV3IYFR';
  SECRET_ACCESS_KEY = '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';
  REGION = 'us-east-1';
  BUCKET = 'futurepro';

  constructor(
    public http: HttpClient, public file: FileProvider) {
  }

  upload(file: any, contentType: string, fileName: string) {
    return new Promise((success) => {
      const s3 = new S3(
        { 
          accessKeyId: this.ACCESS_KEY_ID,
          secretAccessKey: this.SECRET_ACCESS_KEY,
          region: this.REGION
        }
      );
      const params = {
        Bucket: this.BUCKET,
        Key: fileName,
        Body: file,
        ContentType: contentType
      };

      s3.upload(params, function (error: any, data: any) {
        if (error) {
          alert(JSON.stringify(error));
          console.log('There was an error uploading your file: ', error);
          return success(false);
        }

        console.log('Successfully uploaded file.', data);
        return success(true);
      });
    });
  }

  download() {
  }
}
