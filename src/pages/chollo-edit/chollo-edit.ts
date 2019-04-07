import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, ViewController, ToastController} from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import {Chollo} from "../../models/chollo";
import {CholloDetailPage} from "../chollo-detail/chollo-detail";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {UsernameValidator} from "../../validators/username";

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


  public chollazo : Chollo;
  public id : any;
  public updateForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view : ViewController,
              public cholloService : ChollosProvider, public toast : ToastController,
              public formBuilder : FormBuilder,
              public modal : ModalController,
              public provChollo : ChollosProvider) {


    this.updateForm = formBuilder.group({
      title: ['',
        Validators.compose([Validators.minLength(4), Validators.required])],
      description: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      url: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      });

    this.id = navParams.data;

  }

  ionViewWillLoad() {
    this.chollazo = this.navParams.get('chollo');
    this.id = this.navParams.get('id');
  }

  closeModal(){
    this.view.dismiss();
  }

  getChollo(){
    this.provChollo.getCholloDetail(this.id).then( (data) => {

    } )
  }


  updateChollo(){
    this.chollazo.title = this.updateForm.value.title;
    this.chollazo.desc = this.updateForm.value.description;
    this.chollazo.url = this.updateForm.value.url;
    this.chollazo.date = new Date().toLocaleDateString();
    this.cholloService.updateChollo(this.chollazo, this.id);
    this.showConfirmation();
    this.closeModal();
    this.ionViewWillLoad();

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
