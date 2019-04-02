import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import {ChollosProvider} from "../../providers/chollos/chollos";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provChollo: ChollosProvider, public loadingController: LoadingController)
  {
    this.id = navParams.data;
  }

  ionViewDidLoad() {
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
        }
      })
      .then(() => loader.dismiss());
  }

  /**
   * ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Cargando los mejores chollos"
    });
    loader.present()
    this.provChollo.getCholloDetail(this.id)
      .then((snapshot) => {
        for (let k in snapshot) {
          this.chollo.push({
            id: k,
            title: snapshot[k].title,
            desc: snapshot[k].desc,
            url: snapshot[k].url
          })
        }
      })
      .then(() => loader.dismiss());
  }
   */

  /**
   *ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Cargando chollo"
    });
    loader.present()
    this.provChollo.getCholloDetail(this.id)
      .then((snapshot) => {
        this.chollo.push({
          id: this.id,
          title: snapshot.title,
          desc: snapshot.desc,
          url: snapshot.url,
        })
      })
      .then(() => loader.dismiss());
  }
   */

}
