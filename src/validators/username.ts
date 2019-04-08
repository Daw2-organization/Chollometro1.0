import {FormControl} from '@angular/forms';
import * as firebase from "firebase";

export class UsernameValidator {
  static validUsername(fc: FormControl) {
    // console.log(fc);
    // console.log(fc.value);

    //esto deberia ir en el provider pero la funcion es static, por tanto no podemos inyectarlo.
    //se hace aqui y punto.
    function userExists(fc: FormControl) {
      // console.log(fc.value);
      firebase
        .database()
        .ref(`users`)
        .orderByChild('userName')
        .equalTo(fc.value)
        .on("value", (data) => {
          // console.log(data.val());
          if (data.val() != null) {
            //si data contiene algo pues el nombre esta en uso
            return false;
          } else {
            //si data es null el nombre esta disponible
            return true;
          }
        })
    }

    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc" || !userExists(fc)) {
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}
