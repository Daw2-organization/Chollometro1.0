import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, MenuController, ModalController } from 'ionic-angular';
import { User } from "../../models/user";
import { UserProvider } from "../../providers/user/user";
import { ProfileProvider } from "../../providers/profile/profile";
import * as firebase from 'firebase';
import {LoginPage} from "../login/login";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user = {} as User;
  user2: any;

  constructor(private userDL: UserProvider, private profileDL: ProfileProvider, public menuCtrl: MenuController,
              public alertCtrl: AlertController, public popoverCtrl: PopoverController, public navCtrl: NavController,
              public navParams: NavParams, private modal: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    this.profileDL.getUserData()
      .then((data) => {
        this.user2 = {
          email: data.email,
          userName: data.userName,
        }
      });
    console.log(this.user2);
  }

  ionViewDidEnter() {

  }

  presentPopover() {
    const popover = this.popoverCtrl.create(UserProfilePage);
    popover.present();
  }

  logOut(user: User) {
    let done = this.userDL.userLogOut(user);
    if (done) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  presentConfirmation(user: User) {
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
            this.logOut(user);
          }
        }
      ]
    });
    alert.present();
  }

  goToUpdateUser() {
    console.log("goToUpdateUser");
  }
}
