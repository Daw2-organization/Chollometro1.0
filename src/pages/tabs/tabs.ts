import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { UserPage } from "../user/user";
import { ChollosPage } from "../chollos/chollos";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChollosPage;
  tab2Root = AboutPage;
  tab3Root = UserPage;

  constructor() {

  }
}
