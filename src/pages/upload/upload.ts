import { Component } from '@angular/core';
import { NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import { Chollo} from "../../models/chollo";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ChollosProvider } from "../../providers/chollos/chollos";
import { ProfileProvider } from "../../providers/profile/profile";
import * as firebase from 'firebase';



/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

    public chollo= {} as Chollo;

  constructor(private ChollosService: ChollosProvider, public navCtrl: NavController,
              public navParams: NavParams, public imagePicker: ImagePicker,
              public toastCtrl: ToastController
              ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

   uploadChollo(chollo: Chollo){
    chollo.userID = firebase.auth().currentUser.uid;
    chollo.date = new Date().toLocaleDateString();
    this.ChollosService.uploadChollo(chollo);
    this.mostrarConfirmacion();
    this.navCtrl.pop();
  }

  // openImagePicker(){
  //   this.imagePicker.hasReadPermission().then(
  //     (result) => {
  //       if(result == false){
  //         // no callbacks required as this opens a popup which returns async
  //         this.imagePicker.requestReadPermission();
  //       }
  //       else if(result == true){
  //         this.imagePicker.getPictures({
  //           maximumImagesCount: 1
  //         }).then(
  //           (results) => {
  //             for (var i = 0; i < results.length; i++) {
  //               this.uploadImageToFirebase(results[i]);
  //             }
  //           }, (err) => console.log(err)
  //         );
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }

  // uploadImageToFirebase(image){
  //   image = normalizeURL(image);
  //
  //   //uploads img to firebase storage
  //   this.myPhotoRef.uploadImage(image)
  //     .then(photoURL => {
  //
  //       let toast = this.toastCtrl.create({
  //         message: 'Image was updated successfully',
  //         duration: 3000
  //       });
  //       toast.present();
  //     })
  // }

    mostrarConfirmacion() {
      let notif = this.toastCtrl.create({
        message: 'El chollo se ha creado correctamente',
        duration: 3000,
        position: 'top'
      });
      notif.present();
    }

}
