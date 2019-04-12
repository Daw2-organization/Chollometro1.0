import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from "../../models/user";
import {AngularFireDatabase} from "@angular/fire/database";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable()
export class ProfileProvider {

  user = {} as User;
  userData: any;



  constructor( private firedb: AngularFireDatabase, public http: HttpClient) {
    console.log('Hello ProfileProvider Provider');
  }

  getUserData(){
    return firebase
      .database()
      .ref('/users')
      .child(firebase.auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        // console.log(snapshot.val());
        return snapshot.val();
      });
  }

  updateUserData(email: string, name: string, surname: string, userName: string): Promise<any>  {
    console.log(email, name, surname, userName);

    return firebase
      .auth()
      .currentUser
      .updateEmail(email)
      .then( (data) => {
        firebase
          .database()
          .ref(`users`)
          .child(firebase.auth().currentUser.uid)
          .update({
            email: email,
            name: name,
            surname: surname,
            userName: userName
          })
      })
  }
}
