import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyConferencePage } from '../../pages/my-conference/my-conference';

import { RestProvider } from './../../providers/rest/rest';
import { Database } from './../../providers/database/database';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    public formdata:any = [];
    public items:any = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public database: Database, public storage: Storage) {
      
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	login(formdata){
      var toaster = this.toastCtrl.create({
        duration: 3000,
        position: 'bottom'
      });
      console.log(formdata);

      if(formdata.regno == '' || formdata.regno == undefined){
        toaster.setMessage('Registration no. is required');
        toaster.present();
        return false;
      }
      if(formdata.email_mobile == '' || formdata.email_mobile == undefined){
        toaster.setMessage('Email/Mobile no. is required');
        toaster.present();
        return false;
      }

      let loading = this.loadingCtrl.create({content:'Logging in, please wait....'});
      loading.present();

      this.restProvider.login(formdata).subscribe(
        data=> {
          loading.dismissAll();
          this.items = data;
          if(this.items.ErrorCode == 0){
            this.storage.set('login_id', this.items.data[0].registration_id);
            this.database.addUser(this.items.data[0]);
            this.navCtrl.push(MyConferencePage);
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
