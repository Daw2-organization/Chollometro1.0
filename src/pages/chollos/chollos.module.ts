import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChollosPage } from './chollos';
import {CloudinaryModule} from "@cloudinary/angular-5.x";

@NgModule({
  declarations: [
    ChollosPage,
  ],
  imports: [
    IonicPageModule.forChild(ChollosPage),
    CloudinaryModule,
  ],
})
export class ChollosPageModule {}
