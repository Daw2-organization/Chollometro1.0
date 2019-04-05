import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, AlertController, ModalController } from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import {ChollosPage} from "../chollos/chollos";
import {CholloEditPage} from "../chollo-edit/chollo-edit";
import {AuthenticationProvider} from "../../providers/authentication/authentication";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provChollo: ChollosProvider,
              public loadingController: LoadingController,
              public alert : AlertController,
              public modal : ModalController,
              public authProvider: AuthenticationProvider){
              this.id = navParams.data;

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
        console.log("Chollo");
        console.log(this.chollo);
        this.getUserName();
      })
      .then(() => loader.dismiss());
  }

  //Eliminar chollo
  removeChollo(id : any){
    this.provChollo.removeChollo(id);
    this.navCtrl.setRoot(ChollosPage)
  }

  getUserName(){
    this.authProvider.getUserName(this.chollo.userID)
      .then( (snapshot) => {
        this.name = snapshot.userName;
      })

  }

  //Editar chollo
  openModal(){
    const a = this.modal.create(CholloEditPage, { chollo : this.chollo, id : this.id });
    a.present();
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
            this.removeChollo(this.id);
            console.log("Delete clicked.");
          }
        }
      ]
    });
    dialog.present();
  }
}
