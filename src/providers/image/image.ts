import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from "ng2-cloudinary";

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  upload : CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: 'CLOUDINARY CLOUD NAME', uploadPreset: 'CLOUDINARY UPLOAD PRESET' })
  );

  constructor(public http: HttpClient) {
    //console.log('Hello ImageProvider Provider');
  }

/**
  uploadImage(){
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
    }
    this.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }
*/
}
