import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import AuthProvider = firebase.auth.AuthProvider;
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import {CholloDetailPage} from "../chollo-detail/chollo-detail";
import * as firebase from "firebase";
import {ChollosPage} from "../chollos/chollos";
import {CholloEditPage} from "../chollo-edit/chollo-edit";


/**
 * Generated class for the MyOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-offers',
  templateUrl: 'my-offers.html',
})
export class MyOffersPage {

  public chollitos : any = [];
  id : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingController : LoadingController,
              public provChollo : ChollosProvider,
              public authProvider : AuthenticationProvider,
              public alert : AlertController,
              public modal : ModalController) {
        this.id = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOffersPage');
    this.getMyChollos();
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  //Eliminar chollo
  removeChollo(){
    this.presentConfirmation();
    this.provChollo.removeChollo(this.id);
    this.navCtrl.setRoot(ChollosPage)
  }

  getMyChollos(){
    let loader = this.loadingController.create({
      content: "Loading the best offers"
    });
    loader.present();

    this.provChollo.getUserOffers().then((value) => {
      for (let k in value) {
        this.chollitos.push({
            id: k,
            title: value[k].title,
            desc: value[k].desc,
            url: value[k].url,
            date: value[k].date,
            userID: value[k].userID
          }
        )

      }
    });

      loader.dismiss();
      console.log("Chollitos: ",this.chollitos);
  }

  //Mensaje de confirmación para eliminar un chollo
  presentConfirmation(){
    let dialog = this.alert.create({
      title: 'Delete offer',
      message: 'Do you really want to delete the offer?',
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
          text: 'Delete',
          handler: () => {
            this.removeChollo();
            console.log("Delete clicked.");
          }
        }
      ]
    });
    dialog.present();
  }
  //Editar chollo
  openModal(){
    const a = this.modal.create(CholloEditPage, { chollo : this.chollitos, id : this.id });
    a.present();
  }

  goToCholloDetail() {
    this.navCtrl.push(CholloDetailPage,this.id);
  }

}
