import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Chollo} from "../../models/chollo";
// import {AngularFireDatabase} from "@angular/fire/database";

/*
  Generated class for the ChollosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChollosProvider {

  constructor(public http: HttpClient) {
  // constructor() {
    console.log('Hello ChollosProvider Provider');
  }

  uploadChollo(chollo: Chollo) {

    let key = firebase.database().ref().child('chollos').push().key;

    firebase
      .database()
      .ref()
      .child ('chollos')
      .push(key)
      .set(chollo)
  }

}
