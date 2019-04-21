import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Ng2CloudinaryModule} from "ng2-cloudinary";

import {FileSelectDirective, FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    Ng2CloudinaryModule
  ],
  declarations: [
  ],
  providers: [],
  exports: []
})
export class SharedModule { }
