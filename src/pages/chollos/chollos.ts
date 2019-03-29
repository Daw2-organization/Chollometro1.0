import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UploadPage } from "../upload/upload";

/**
 * Generated class for the ChollosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chollos',
  templateUrl: 'chollos.html',
})
export class ChollosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChollosPage');
  }

  goToUploadPage(){
    this.navCtrl.push(UploadPage);
  }


}
