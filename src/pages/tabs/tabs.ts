import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ChollosPage } from "../chollos/chollos";
import { UserProfilePage } from "../user-profile/user-profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChollosPage;
  tab2Root = AboutPage;
  tab3Root = UserProfilePage;

  constructor() {

  }
}
