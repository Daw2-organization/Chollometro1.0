import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CholloEditPage } from './chollo-edit';

@NgModule({
  declarations: [
    CholloEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CholloEditPage),
  ],
})
export class CholloEditPageModule {}
