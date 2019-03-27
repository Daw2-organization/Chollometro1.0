import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {Chollo} from "../../models/chollo";


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
    let key = firebase.database().ref().child('chollos').push().key;

    firebase
      .database()
      .ref()
      .child ('chollos')
      .push(key)
      .set(chollo)
  }
}
