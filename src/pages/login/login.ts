import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from "../../providers/user/user";

import { TabsPage } from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private userDL: UserProvider, private fireAuth: AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
    try {

      let done = await this.userDL.userLogIn(user);
      console.log(done);

      if(done){
        this.navCtrl.setRoot(TabsPage);
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
