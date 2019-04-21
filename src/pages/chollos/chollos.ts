import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, NavParams, MenuController} from 'ionic-angular';
import { UploadPage } from "../upload/upload";
import { ChollosProvider } from "../../providers/chollos/chollos"
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
              public provChollo: ChollosProvider, private authProvider: AuthenticationProvider,
              public menuCtrl: MenuController)
  {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewWillEnter() {
    this.getOffers();
  }

  //Devuelve todas las ofertas que se encuentran en firebase.
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
      .then(() => loader.dismiss());
  }

  /**
   getOffers(){
    let loader = this.loadingController.create({
      content: "Loading the best offers"
    });
    loader.present().then( ()=> {
       this.provChollo.getChollos()
        .subscribe( data => {
            this.getUserName(data.userID)
            .then(value => {
              this.chollitos.push({
                id: data.id,
                title: data.title,
                desc: data.desc,
                url: data.url,
                date: data.date,
                userID: data.userID,
                userName: value
              });
            })
        });
      console.log("chollitos",this.chollitos);
      loader.dismiss().then(() => console.log("Las ofertas se han descargado correctamente"));
    })
  }

   */

  //Recarga el feed de la página
  doRefresh(refresher) {
    this.getOffers();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

    //Devuelve el nombre de usuario para que aparezca en las tarjetas
    getUserName(uid : any): Promise<string> {
    return this.authProvider.getUserName(uid)
      .then((snapshot) => {
        return snapshot.userName;
      }, () => {
        return "Error while retrieving userName";
      });
  }

  goToUploadPage(){
    this.navCtrl.push(UploadPage);
  }


  goToCholloDetails(id : any){
    this.navCtrl.push(CholloDetailPage, id);
  }

}
