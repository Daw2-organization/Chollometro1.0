import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { UserProvider } from "../../providers/user/user";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private userDL: UserProvider, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User){
    let error = "Error: ";
    try {

      if (this.user.password != this.user.passwordConfirm || this.user.password == null || this.user.passwordConfirm == null){
        // error += "Passwords don't match"
        throw error += "Passwords don't match";
      }

      if(this.user.userName == ""){
        throw error += "Username cannot be empty";
      }

      let done = await this.userDL.userSignIn(user);
      console.log(done);

      if(done){
        this.userDL.uploadUser(user);
        this.userDL.userLogIn(user);
        this.navCtrl.setRoot(TabsPage);
      }
    }catch(e) {

      console.log(e.code);

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
        position: "top",
        message: error,
        duration: 3000,
        cssClass: "toastError"
      }).present();

    }

  }

}
