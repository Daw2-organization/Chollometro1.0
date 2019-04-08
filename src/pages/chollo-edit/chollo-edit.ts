import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController,
  ToastController,
  LoadingController
} from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";
import {Chollo} from "../../models/chollo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
              public provChollo : ChollosProvider,
              public loadingController: LoadingController) {


    this.updateForm = formBuilder.group({
      title: ['',
        Validators.compose([Validators.minLength(4), Validators.required])],
      description: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      url: ['',
        Validators.compose([Validators.minLength(6), Validators.required])],
      });

    this.id = navParams.get('id');
  }

  ionViewWillLoad() {
    let loader = this.loadingController.create({
      content: "Cargando chollo"
    });
    loader.present()
    this.provChollo.getCholloDetail(this.id)
      .then((snapshot) => {
        this.chollazo = {
          title: snapshot.title,
          desc: snapshot.desc,
          url: snapshot.url,
          userID: snapshot.userID,
          date: snapshot.date
        }
      })
      .then(() => loader.dismiss());
  }

  closeModal(){
    this.view.dismiss()
      .then(()=> console.log("Modal closed"))
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
    notif.present()
      .then(()=> console.log("Notification showed"))

  }

}
