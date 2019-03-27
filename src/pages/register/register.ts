import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private fireAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {

  }

  async register(user: User){
    let error = "Error: ";
    try {

      if (this.user.password != this.user.passwordConfirm || this.user.password == null || this.user.passwordConfirm == null){
        error += "Passwords don't match"
        throw error;
      }

      //esto tiene que tener algo dentro para que se haya registrado el usuario correctamente (mirar en firebase)
      const info = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);



      firebase
        .database()
        .ref()
        .child("users")
        .child(firebase.auth().currentUser.uid)
        .set({
          email: firebase.auth().currentUser.email,
        });

      if(info){
        console.log(info);
        this.navCtrl.setRoot('LoginPage');
      }
    }catch(e) {

      console.error(e.code);

      switch (e.code){
        case "auth/email-already-in-use":
          error += "E-mail already in use";
          break;
        case "auth/invalid-password":
          error += "Invalid password";
          break;
        case "auth/argument-error":
          error += "No field cant be empty";
          break;
        case "auth/weak-password":
          error += "Weak password, At least 6 characters";
          break;
        case "auth/invalid-email":
          error += "Invalid E-mail";
          break;
        case "Error: Passwords don't match":
          break;
        default:
          break;
      }


      this.toast.create({
        showCloseButton: true,
        position: "top",
        message: error,
        duration: 3000,
        cssClass: "toastError"
      }).present();

    }

  }

}
