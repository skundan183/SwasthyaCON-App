import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

    data = {};
  	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  	
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ContactPage');
  	}

    submitForm(data){
      this.presentAlert();
      //console.log(data.name);
    }
    
  	presentAlert() {
	  	let alert = this.alertCtrl.create({
		    title: 'Success',
		    subTitle: 'Thank you! We will get back to you soon.',
		    buttons: ['Dismiss']
	  	});
  		alert.present();
	}

}
