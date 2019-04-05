import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "./firebase.config";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ChollosPage} from "../pages/chollos/chollos";
import {UploadPage} from "../pages/upload/upload";
import {LoginPageModule} from "../pages/login/login.module";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ChollosProvider } from '../providers/chollos/chollos';
import {HttpClientModule} from "@angular/common/http";
import { AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import { CholloDetailPage} from "../pages/chollo-detail/chollo-detail";
import { Cloudinary } from "cloudinary-core";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import {UserProfilePage} from "../pages/user-profile/user-profile";
import { ProfileProvider } from '../providers/profile/profile';
import {CholloEditPage} from "../pages/chollo-edit/chollo-edit";
import { AuthenticationProvider } from "../providers/authentication/authentication";
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { ImageProvider } from '../providers/image/image';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    ChollosPage,
    UploadPage,
    UserProfilePage,
    CholloDetailPage,
    CholloEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    LoginPageModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    Ng2CloudinaryModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'oskitayeduado' } as CloudinaryConfiguration)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    ChollosPage,
    UploadPage,
    CholloDetailPage,
    UserProfilePage,
    CholloEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    ChollosProvider,
    ProfileProvider,
    ImageProvider
  ]
})

export class AppModule {}
