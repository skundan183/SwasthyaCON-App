import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Database } from './../../providers/database/database';
import { EditProfilePage } from '../../pages/edit-profile/edit-profile';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    userdata:any = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController, public storage: Storage, public database: Database) {
  		this.initilizePage();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProfilePage');
  	}

  	initilizePage(){
  		this.storage.get('login_id').then((login_id) => {
          console.log(login_id);
          this.database.getUserDetails(login_id).then(data => {
          	console.log(data);
		        this.userdata = data;
		      })
  		});
  	}

    editProfile(type){
      var modalPage = this.modalCtrl.create(EditProfilePage, { type : type, userdata : this.userdata }); 
      modalPage.onDidDismiss(() => {
        this.initilizePage();
      });
      modalPage.present();
    }
}
