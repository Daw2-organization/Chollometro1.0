import { FormControl, FormGroup } from '@angular/forms';

export class ConfirmPasswordValidator {
  static checkConfirmPassword(control: FormControl){
    if (control.value == control.root.value['password']) {
      console.log('passwords match');
      return null;
    } else {
      console.log('passwords dont match');
      return {
        isValid: true
      };
    }
  }
}
