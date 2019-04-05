import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, MenuController, ModalController } from 'ionic-angular';
import { User } from "../../models/user";
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

  constructor(private profileDL: ProfileProvider, public menuCtrl: MenuController,
              public popoverCtrl: PopoverController, public navCtrl: NavController,
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

}
