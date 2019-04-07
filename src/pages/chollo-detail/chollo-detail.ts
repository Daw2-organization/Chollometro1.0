import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, AlertController, ModalController } from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import {ChollosPage} from "../chollos/chollos";
import {CholloEditPage} from "../chollo-edit/chollo-edit";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import * as firebase from 'firebase';



/**
 * Generated class for the CholloDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chollo-detail',
  templateUrl: 'chollo-detail.html',
})
export class CholloDetailPage {

  chollo : any = {};
  id : any;
  name : any;
  currentUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provChollo: ChollosProvider,
              public loadingController: LoadingController,
              public alert : AlertController,
              public modal : ModalController,
              public authProvider: AuthenticationProvider){
              this.id = navParams.data;
              this.currentUser = firebase.auth().currentUser.uid;

  }

  ionViewDidLoad() {
    console.log();
    let loader = this.loadingController.create({
      content: "Cargando chollo"
    });
    loader.present()
    this.provChollo.getCholloDetail(this.id)
      .then((snapshot) => {
        this.chollo = {
          id: this.id,
          title: snapshot.title,
          desc: snapshot.desc,
          url: snapshot.url,
          userID: snapshot.userID,
          date: snapshot.date
        }
        this.getUserName();
      })
      .then(() => loader.dismiss());
  }

  getUserName(){
    this.authProvider.getUserName(this.chollo.userID)
      .then( (snapshot) => {
        this.name = snapshot.userName;
      })
  }

}
