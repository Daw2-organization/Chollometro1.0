import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the UserUpdateModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "UserUpdateModalPage"
})
@Component({
  selector: 'page-user-update-modal',
  templateUrl: 'user-update-modal.html',
})
export class UserUpdateModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController)
  {

  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUpdateModalPage');
  }

}
