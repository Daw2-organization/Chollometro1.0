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
import { ProviderpruebaProvider } from '../providers/providerprueba/providerprueba';
import { UserProvider } from '../providers/user/user';
import { ChollosProvider } from '../providers/chollos/chollos';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    ChollosPage,
    UploadPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    LoginPageModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage,
    ChollosPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderpruebaProvider,
    UserProvider,
    ChollosProvider
  ]
})
export class AppModule {}
