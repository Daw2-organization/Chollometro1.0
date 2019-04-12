import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, PopoverController, AlertController, MenuController, ModalController,
  LoadingController
} from 'ionic-angular';
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

@IonicPage({
  name: 'UserProfilePage'
})
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user = {} as User;
  user2: any;
  loader:any;

  constructor(private profileDL: ProfileProvider, public menuCtrl: MenuController,
              public popoverCtrl: PopoverController, public navCtrl: NavController,
              public navParams: NavParams, private modal: ModalController,
              public loading: LoadingController)
  {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewWillEnter(){
    this.loader = this.loading.create({content: "Loading..."});
    this.loader.present();

    this.profileDL.getUserData()
      .then((data) => {
        // console.log(data);
        this.user2 = {
          email: data.email,
          userName: data.userName,
          name: data.name,
          surname: data.surname
        }
        // console.log(this.user2);
      });

    this.loader.dismiss();
    // console.log(this.user2);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserProfilePage');
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(UserProfilePage);
    popover.present();
  }

}
