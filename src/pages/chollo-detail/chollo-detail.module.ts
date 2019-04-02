import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CholloDetailPage } from './chollo-detail';

@NgModule({
  declarations: [
    CholloDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CholloDetailPage),
  ],
})
export class CholloDetailPageModule {}
