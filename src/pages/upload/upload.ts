import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chollo } from "../../models/chollo";
import { ChollosProvider } from "../../providers/chollos/chollos";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

    chollo = {} as Chollo;


  constructor(private ChollosService: ChollosProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadChollo(chollo: Chollo){
    this.ChollosService.uploadChollo(chollo)
  }
}
