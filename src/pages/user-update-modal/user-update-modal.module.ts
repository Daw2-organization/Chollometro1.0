import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserUpdateModalPage } from './user-update-modal';

@NgModule({
  declarations: [
    UserUpdateModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserUpdateModalPage),
  ],
})
export class UserUpdateModalPageModule {}
