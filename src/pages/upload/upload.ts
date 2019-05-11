import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import { Chollo} from "../../models/chollo";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ChollosProvider } from "../../providers/chollos/chollos";
import { ProfileProvider } from "../../providers/profile/profile";
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//Cloudinary
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import {firebaseConfig} from "../../app/firebase.config";




/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

    public chollo = {} as Chollo;
    public uploadForm: FormGroup;
    private UserPhoto : any;
    private public_id;

    uploader: CloudinaryUploader = new CloudinaryUploader(
      new CloudinaryOptions({
        cloudName: firebaseConfig.cloudinary.cloud_name,
        uploadPreset: firebaseConfig.cloudinary.upload_preset
      })
    );


  constructor(private ChollosProv: ChollosProvider, public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController, public menuCtrl: MenuController,
              public formBuilder : FormBuilder) {

    this.uploadForm = formBuilder.group({
      title: ['',
        Validators.compose([Validators.minLength(4), Validators.required])],
      description: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      url: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }


    //Sube un chollo a firebase
   uploadChollo(chollo : Chollo){
    console.log("CholloUpload", this.chollo)
    chollo.userID = firebase.auth().currentUser.uid;
    chollo.date = new Date().toLocaleDateString();
    chollo.photo = this.UserPhoto;
    this.ChollosProv.uploadChollo(chollo);
    this.mostrarConfirmacion();
    this.navCtrl.pop();
  }

  uploadImage(chollo : Chollo){
    if(this.uploader.queue.length) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        let res: any = JSON.parse(response);
        console.log(res);
        this.UserPhoto = res.public_id;
        this.uploadChollo(chollo);
      };
    }
  }

    //Muestra confirmación de que se ha subido correctamente el chollo
    mostrarConfirmacion() {
      let notif = this.toastCtrl.create({
        message: 'El chollo se ha creado correctamente',
        duration: 3000,
        position: 'top'
      });
      notif.present();
    }

}
