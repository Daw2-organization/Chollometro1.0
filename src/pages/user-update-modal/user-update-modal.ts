import {Component} from '@angular/core';
import {
  IonicPage, LoadingController, MenuController, NavController,
  NavParams, ViewController, Loading, AlertController
} from 'ionic-angular';
import {ProfileProvider} from "../../providers/profile/profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {UsernameValidator} from "../../validators/username";
import {AuthenticationProvider} from "../../providers/authentication/authentication";
import * as firebase from 'firebase';
import {TabsPage} from "../tabs/tabs";
import {UserProfilePage} from "../user-profile/user-profile";

/**
 * Generated class for the UserUpdateModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "UserUpdateModalPage"
})
@Component({
  selector: 'page-user-update-modal',
  templateUrl: 'user-update-modal.html',
})
export class UserUpdateModalPage {


  public userUpdateForm: FormGroup;
  public loader: any;
  public user: any;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController, public viewCtrl: ViewController,
              public loadingCtrl: LoadingController, public profileDL: ProfileProvider,
              public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public authProvider: AuthenticationProvider) {
    this.userUpdateForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ['',
        Validators.compose([Validators.minLength(3), Validators.required])],
      surname: ['',
        Validators.compose([Validators.minLength(3), Validators.required])],
      userName: ['',
        Validators.compose([Validators.minLength(3), UsernameValidator.validUsername, Validators.required])]
    });
  }

  ionViewDidEnter() {
    // this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {

    this.loader = this.loadingCtrl.create({content: "Loading..."});
    this.loader.present();

    this.profileDL.getUserData()
      .then((data) => {
        this.user = {
          email: data.email,
          userName: data.userName,
          name: data.name,
          surname: data.surname
        }
      });
    this.loader.dismiss();
  }

  updateUser() {
    if(!this.userUpdateForm.valid){
      console.log("userUpdateForm is not valid ma man");
    }else{
      this.profileDL.updateUserData(this.userUpdateForm.value.email, this.userUpdateForm.value.name,
        this.userUpdateForm.value.surname, this.userUpdateForm.value.userName)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.closeModal();
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  closeModal() {
    const data = {
      type: "modal",
      state: "closed"
    }
    this.viewCtrl.dismiss();
    // this.navCtrl.push('UserProfilePage');
    // this.navCtrl.popToRoot();
  }

  changePassword() {
    this.authProvider.resetPassword(firebase.auth().currentUser.email)
      .then((user) => {
      let alert = this.alertCtrl.create({
        message: "We've sent you an email to reset your password, as always check spam inbox just in case.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              // usamos el pop que es mas sensato para evitar problemas con lo de la pila explicado en clase.
              // this.navCtrl.setRoot(LoginPage)
              this.closeModal();
            }
          }
        ]
      });
      alert.present();

    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      errorAlert.present();
    });
  }
}
