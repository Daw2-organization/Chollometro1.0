import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';



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
    try {
      //esto tiene que tener algo dentro para que se haya registrado el usuario correctamente (mirar en firebase)
      const info = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      if(info){
        console.log(info);
        this.navCtrl.setRoot('LoginPage');
      }
    }catch(e) {
      //console.error(e);
      this.toast.create({
        message: "All fields required & password must be at least 6 chars long",
        duration: 5000,
        cssClass: "error"
      }).present();
    }

  }

}
