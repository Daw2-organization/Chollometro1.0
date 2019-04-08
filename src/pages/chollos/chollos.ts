import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { UploadPage } from "../upload/upload";
import { ChollosProvider } from "../../providers/chollos/chollos"
import {visitValue} from "@angular/compiler/src/util";
import {CholloDetailPage} from "../chollo-detail/chollo-detail";
import {AuthenticationProvider} from "../../providers/authentication/authentication";

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

  chollitos : any = [];
  name : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingController: LoadingController,
              public provChollo: ChollosProvider,
              private authProvider: AuthenticationProvider) {
  }


  //Usamos ionViewWillEnter para que cuando creas un chollo  te devuelva a ChollosPage y te cargue el nuevo chollo que
  //se ha subido a la base de datos.

  ionViewWillEnter() {
    this.getOffers()
  }

  getOffers() {
    let loader = this.loadingController.create({
      content: "Loading the best offers"
    });
    loader.present();
    this.provChollo.getChollos()
      .then(async (snapshot) => {
        //Vaciamos el vector pq cuando subimos un nuevo chollo, se quedan en el vector los anteriores chollos
        // y además carga otra vez todos y el nuevo
        this.chollitos = [];
        for (let k in snapshot) {
          this.getUserName(snapshot[k].userID).then(
            value => {
              this.chollitos.push({
                  id: k,
                  title: snapshot[k].title,
                  desc: snapshot[k].desc,
                  url: snapshot[k].url,
                  date: snapshot[k].date,
                  userID: snapshot[k].userID,
                  userName: value
                }
              );
          })
        }

      })
      .then(() => loader.dismiss())
      .then(()=>console.log("aaaa",this.chollitos));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  getUserName(uid: any): Promise<string> {
    return this.authProvider.getUserName(uid)
      .then((snapshot) => {
        return snapshot.userName;
      }, () => {
        return "Esto ha explotado"
      });
  }

  goToUploadPage(){
    this.navCtrl.push(UploadPage);
  }


  goToCholloDetail(id : string) {
    console.log("THischollitosid", id);
    this.navCtrl.push(CholloDetailPage, id);
  }
}
