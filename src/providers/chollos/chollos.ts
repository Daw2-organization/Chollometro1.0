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


  //Sube un chollo
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


  //Actualiza un chollo
  updateChollo(chollo : Chollo, id : any){

    firebase
      .database()
      .ref(`/chollos/${id}`)
      .update(chollo)
      .then(() => console.log("Offer updated"),
        () => console.error("Error while updating the offer"))
  }


  //Elimina un chollo
  removeChollo(id: any){
    firebase
      .database()
      .ref(`/chollos/${id}`)
      .remove()
      .then(() => console.log("Offer deleted"))
  }


  //todos los chollos
  getChollos() {
    return firebase
      .database()
      .ref('/chollos')
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      }, (errData)=>{
        console.log("Error");
        console.log(errData);
      });
  }

  //Detalles de un único chollo
  getCholloDetail(id: any) {
    return firebase
      .database()
      .ref(`/chollos/${id}`)
      .once("value")
      .then((snapshot) => {
        return snapshot.val()
      });
  }

  //Chollos de un usuario
  /**
  getUserOffers() {
    return firebase
      .database()
      .ref(`chollos`)
      .orderByChild('userID')
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (data) => {
        console.log("Array de chollos del user: ", data.val())
        return data.val();
      })


      .once("value", (data) => {
        console.log("Ligma",data.val());
        return data;
      }, (errData)=>{
        console.log("Error");
        console.log(errData);
      });
       */


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


