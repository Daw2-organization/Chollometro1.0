import {FormControl} from '@angular/forms';
import * as firebase from "firebase";
import * as _ from "lodash";


export class UsernameValidator {
  static validUsername(fc: FormControl) {
    let query: Array<any> = [];

    //esto deberia ir en el provider pero la funcion es static, por tanto no podemos inyectarlo.
    //se hace aqui y punto.
    firebase
      .database()
      .ref(`users`)
      .on('value', data => {
        data.forEach(dataValue => {
          query.push(dataValue.val().userName);
          return false;
        })
      });
    console.log(query);

    if (_.includes(query,fc.value)) {
      // console.log("Username Exists, must change")
      return ({validUsername: true});
    } else {
      // console.log("username doesnt exist.")
      return (null);
    }
  }
}
