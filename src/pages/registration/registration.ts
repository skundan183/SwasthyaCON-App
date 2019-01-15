import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OnlineRegistrationPage } from '../../pages/online-registration/online-registration';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams) {

  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad RegistrationPage');
  	}

    onlineReg(){
      this.navCtrl.push(OnlineRegistrationPage);
    }

}
