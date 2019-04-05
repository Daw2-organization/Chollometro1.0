import { Component, ViewChild } from '@angular/core';
import {AlertController, NavController, Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {firebaseConfig} from "./firebase.config";
import * as firebase from 'firebase';
import {AuthenticationProvider} from "../providers/authentication/authentication";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = 'LoginPage';
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public alertCtrl: AlertController, private authProvider: AuthenticationProvider) {

    //metemos esto aqui porque peta diciendo: Firebase: No Firebase App '[DEFAULT]' has been created
    firebase.initializeApp(firebaseConfig);
    //observable para cambios en el estado de la autenticacion del usuario
    // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     this.rootPage = 'LoginPage';
    //     unsubscribe();
    //   } else {
    //     this.rootPage = TabsPage;
    //     unsubscribe();
    //   }
    // });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }

  goToUpdateUser(){

  }

  presentConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'LogOut',
      message: 'Do you really want to log out of your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            // alert.dismiss();
          }
        },
        {
          text: 'LogOut',
          handler: () => {
            console.log("LogOut clicked.");
            this.logOut();
          }
        }
      ]
    });
    alert.present();
  }

  logOut() {
    let done = this.authProvider.logoutUser();
    if (done) {
      this.nav.setRoot(LoginPage);
    }
    console.log("logOut()");
  }

}
