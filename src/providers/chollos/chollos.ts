import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import {Chollo} from "../../models/chollo";
import {AngularFireDatabase} from "@angular/fire/database";

/*
  Generated class for the ChollosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChollosProvider {

  constructor(public http: HttpClient, private fdb: AngularFireDatabase) {
    // constructor() {
    console.log('Hello ChollosProvider Provider');
  }

  uploadChollo(chollo: Chollo) {

    let key = firebase
      .database()
      .ref()
      .child('chollos')
      .push()
      .key;

    firebase
      .database()
      .ref()
      .child('chollos')
      .push(key)
      .set(chollo)
  }

  updateChollo(chollo : Chollo, id : any){
    console.log("Chupala");
    firebase
      .database()
      .ref()
      .child(`/chollos/${id}`)
      .update({title : chollo.title, desc: chollo.desc, url: chollo.url, user: chollo.user, date: chollo.date})
      .then(() => console.log("Offer deleted"))
  }


  removeChollo(id: any){
    firebase
      .database()
      .ref()
      .child(`/chollos/${id}`)
      .remove()
      .then(() => console.log("Offer deleted"))
  }

  getChollos() {
    return firebase.database()
      .ref('/chollos')
      .once('value')
      .then((snapshot) => {
        return snapshot.val()
      });
  }

  getCholloDetail(id: any) {
    return firebase
      .database()
      .ref(`/chollos/${id}`)
      .once("value")
      .then((snapshot) => {
        return snapshot.val()
      });
  }

}

