import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
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


  updateChollo(chollo: Chollo, id: any) {
    let data = {
      title: chollo.title,
      desc: chollo.desc,
      url: chollo.url,
      date: chollo.date,
      userID: chollo.userID
    }
    console.log('updating chollo: ', id);
    console.log("User id :" + chollo.userID);
    console.log(chollo);
    firebase
      .database()
      //.ref(`/chollos/${id}`)
      .ref()
      .child('chollos')
      .child(id)
      .set(data)
      .then(() => console.log("Offer updated"),
        () => console.error("Error while updating the offer"))
  }


  removeChollo(id: any) {
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


