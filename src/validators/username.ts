import { FormControl } from '@angular/forms';
import * as firebase from "firebase";

export class UsernameValidator {

  static isValid(control: FormControl){
    // if(control.value.toLowerCase() === "abc123" || control.value.toLowerCase() === "123abc"){
    if(this.userExists(control.value)){
      return (null);
    } else {
      return {
        validUsername: true
      };
    }
  }

  static userExists(userName: string){
    console.log("estoy en userExists");
    firebase
      .database()
      .ref(`users`)
      .orderByChild('userName')
      .equalTo(userName)
      .on("value", (data) => {
        console.log(data.val());
        return true;
      }, (errData)=>{
        console.log("Error");
        console.log(errData);
        return false;
      });
  }

}

