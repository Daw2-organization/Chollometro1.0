import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from "../../models/user";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {



  constructor(public http: HttpClient, private fireAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  userSignIn(user: User){

    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

  }

  userLogIn(){

  }

  uploadUser(user: User) {

    firebase
      .database()
      .ref()
      .child("users")
      .child(firebase.auth().currentUser.uid)
      .set({
        email: firebase.auth().currentUser.email,
        userName: user.userName
      });
  }

}
