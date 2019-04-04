import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from "../../models/user";
// import { Rx } from 'rxjs/Rx';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  user = {} as User;
  userData: any;



  constructor( private firedb: AngularFireDatabase, public http: HttpClient) {
    console.log('Hello ProfileProvider Provider');
  }

  getUserData(){

    console.log("getUserData");

    return firebase
      .database()
      .ref('/users')
      .child(firebase.auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        //console.log(snapshot.key);
        //console.log(firebase.auth().currentUser.uid);
        //console.log(snapshot);
        return snapshot.val();
      });
  }

}
