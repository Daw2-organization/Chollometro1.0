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


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingController : LoadingController,
              public provChollo : ChollosProvider,
              public alert : AlertController,
              public modal : ModalController) {
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
  removeChollo(id : string){
    console.log("ID for removing", id);
    this.provChollo.removeChollo(id);
    this.navCtrl.setRoot(MyOffersPage);
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

/**
  getMyChollos(){
    let loader = this.loadingController.create({
      content: "Loading the best offers"
    });
    loader.present();
    this.provChollo.getUserOffers()
      .then( (snapshot) => {
        this.chollitos = [];
        for(let k in snapshot){
          this.chollitos.push({
            id: k,
            title : snapshot[k].title,
            desc : snapshot[k].desc,
            url : snapshot[k].url,
            date : snapshot[k].date,
            userID : snapshot[k].userID
          })
        }
      })
      .then(()=> loader.dismiss())
      .then(()=> console.log("getMyChollos FUCNT", this.chollitos))
  } */

  //Mensaje de confirmación para eliminar un chollo
  presentConfirmation(id : string){
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
            this.removeChollo(id);
            console.log("Delete clicked.");
          }
        }
      ]
    });
    dialog.present();
  }

  //Editar chollo
  openModal(id : any){
    const a = this.modal.create(CholloEditPage, { id : id});
    a.present();
  }

  goToCholloDetail(id : string) {
    this.navCtrl.push(CholloDetailPage,id);
  }

}
