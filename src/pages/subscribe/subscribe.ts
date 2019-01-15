import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../../pages/home/home';

import { RestProvider } from './../../providers/rest/rest';
/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {

	public formdata:any = [];
	public items:any = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public storage: Storage) {
  	
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SubscribePage');
  	}

  	noThanks(){
  		this.storage.set('subscribe', '1');
  		this.navCtrl.setRoot(HomePage);
  	}

  	remindMeLater(){
  		this.storage.set('subscribe', '2');
  		this.navCtrl.setRoot(HomePage);
  	}

  	subscribe(formdata){
  		  var toaster = this.toastCtrl.create({
        	duration: 3000,
        	position: 'bottom'
      	});
      	console.log(formdata);

      	if(formdata.name == '' || formdata.name == undefined){
        	toaster.setMessage('Name is required');
        	toaster.present();
        	return false;
      	}
      	if(formdata.email == '' || formdata.email == undefined){
        	toaster.setMessage('Email is required');
        	toaster.present();
        	return false;
      	}
      	if(formdata.mobile == '' || formdata.mobile == undefined){
        	toaster.setMessage('Mobile no. is required');
        	toaster.present();
        	return false;
      	}

      	let loading = this.loadingCtrl.create({content:'Logging in, please wait....'});
      	loading.present();

      	this.restProvider.subscribe(formdata).subscribe(
      		data=> {
	          	loading.dismissAll();
	          	this.items = data;
	          	if(this.items.ErrorCode == 0){
	            	this.storage.set('subscribe', '3');
	            	this.presentAlert('Success', 'Thank you! You have successfully subscribed.');
  		          this.navCtrl.setRoot(HomePage);
	          	}
	          	else{
	            	this.presentAlert('Failed', this.items.ErrorMessage);
	          	}
        	},
        	err=>{
          		loading.dismissAll();
          		this.presentAlert('Error', "Failed to pass the data. Check your internet connection.");
        	}
      	);
  	}

  	presentAlert(title, subtitle) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['Dismiss']
      });
      alert.present();
    }
}
