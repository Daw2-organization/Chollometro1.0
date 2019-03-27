import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private fireAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
    try {
      const info = await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);

      if(info){
        console.log(info);
        await this.navCtrl.setRoot(TabsPage);
      }
    }catch(e) {

      console.error(e.code);

      const error = "E-mail or password dont match."
      this.toast.create({
        showCloseButton: true,
        position: 'top',
        message: error,
        duration: 3000,
        cssClass: "toastError"
      }).present();
    }

  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}
