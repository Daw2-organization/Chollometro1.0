import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {Chollo} from "../../models/chollo";
import {AngularFireDatabase} from "@angular/fire/database";
import {visitValue} from "@angular/compiler/src/util";

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
    console.log("Update ok")
  }


  updateChollo(chollo : Chollo, id : any){

    firebase
      .database()
      .ref(`/chollos/${id}`)
      .update(chollo)
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
        return snapshot.val();
      }, (errData)=>{
        console.log("Error");
        console.log(errData);
      });
  }

  getCholloDetail(id: any) {
    return firebase
      .database()
      .ref(`/chollos/${id}`)
      .once("value")
      .then((snapshot) => {
        console.log("Offers retrieved correctly");
        return snapshot.val();
      }, (errData)=>{
        console.log("Error");
        console.log(errData);
      });
  }

  getUserOffers() : Promise <any>{
      return firebase
        .database()
        .ref('/chollos')
        .orderByChild('userID')
        .equalTo(firebase.auth().currentUser.uid)
        .once("value")
        .then( value =>  {
          return value.val()},
          value => {
          console.log("Error retrieving  the user Offers")}
          );
    }
}


