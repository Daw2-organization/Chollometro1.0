import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChollosPage} from "../chollos/chollos";
import firebase from 'firebase';
import {Chollo} from "../../models/chollo";
import { firebaseConfig } from "../../app/firebase.config";


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

    chollo= {} as Chollo;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadChollo(chollo: { title: string; desc: string; url: string }) {
    var key = firebase.database().ref().child('chollos').push().key;

    firebase
      .database()
      .ref()
      .child ('chollos')
      .push(key)
      .set(chollo)
  }
}
