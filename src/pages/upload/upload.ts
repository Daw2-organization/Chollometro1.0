import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import { Chollo} from "../../models/chollo";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ChollosProvider } from "../../providers/chollos/chollos";
import { ProfileProvider } from "../../providers/profile/profile";
import * as firebase from 'firebase';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



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
   uploadChollo(chollo: Chollo){
    console.log("CholloUpload", this.chollo)
    chollo.userID = firebase.auth().currentUser.uid;
    chollo.date = new Date().toLocaleDateString();
    this.ChollosProv.uploadChollo(chollo);
    this.mostrarConfirmacion();
    this.navCtrl.pop();
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
