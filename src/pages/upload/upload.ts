import { Component } from '@angular/core';
import {NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import firebase from 'firebase';
import {Chollo} from "../../models/chollo";
import { ImagePicker } from '@ionic-native/image-picker/ngx';



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
    public myPhotoRef : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker, public toastCtrl: ToastController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  uploadChollo(chollo: { title: string; desc: string; url: string }) {
    let key = firebase.database().ref().child('chollos').push().key;
    this.myPhotoRef = firebase.storage().ref('/chollosImages');

    firebase
      .database()
      .ref()
      .child ('chollos')
      .push(key)
      .set(chollo)
  }


  openImagePicker(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                this.uploadImageToFirebase(results[i]);
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
  }

  uploadImageToFirebase(image){
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.myPhotoRef.uploadImage(image)
      .then(photoURL => {

        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }

}
