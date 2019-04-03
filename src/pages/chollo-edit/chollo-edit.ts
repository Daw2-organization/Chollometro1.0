import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ViewController, ToastController} from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import {Chollo} from "../../models/chollo";

/**
 * Generated class for the CholloEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chollo-edit',
  templateUrl: 'chollo-edit.html',
})
export class CholloEditPage {


  chollazo : Chollo;
  id : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController,
              public cholloService : ChollosProvider, public toast : ToastController) {

  }

  ionViewWillLoad() {
    this.chollazo = this.navParams.get('chollo');
    this.id = this.navParams.get('id');
  }

  closeModal(){
    this.view.dismiss();
  }


  updateChollo(){
    console.log("HGola");
    //this.cholloService.updateChollo(this.chollazo, this.id);
    //this.showConfirmation();

  }



  showConfirmation(){
    let notif = this.toast.create({
      message: 'The offer has been updated',
      duration: 3000,
      position: 'top'
    });
    notif.present();

  }

}
