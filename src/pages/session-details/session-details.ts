import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Database } from './../../providers/database/database';
/**
 * Generated class for the SessionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-session-details',
  templateUrl: 'session-details.html',
})
export class SessionDetailsPage {

    public session_id:any = "";
    public session_details:any = [];
    public session_name:any = "";
    public session_title:any = "";
    public chairman:any = "";
    public moderator:any = "";

  	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public database: Database) {
  		this.session_id = this.navParams.get('session_id');
  		this.session_name = this.navParams.get('session_name');
      this.session_title = this.navParams.get('session_title');
      this.moderator = this.navParams.get('moderator');
  		this.chairman = this.navParams.get('chairman');
      console.log(this.session_id);
  		this.database.getSessionDetails(this.session_id).then(data => {
        console.log(data);
        this.session_details = data;
      })
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SessionDetailsPage');
  	}

  	initializePage(){
	    this.database.getSessionDetails(this.session_id).then(data => {
	        console.log(data);
          this.session_details = data;
  		})
  	}
}
