import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailsPage } from '../../pages/session-details/session-details';

import { Database } from './../../providers/database/database';
/**
 * Generated class for the ScientificProgrammePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-scientific-programme',
  templateUrl: 'scientific-programme.html',
})
export class ScientificProgrammePage {
	
	public items:any = [];
	public sessions:any = [];
	public day1:any = [];
	public day2:any = [];
	public days = "day1";

  	constructor(public navCtrl: NavController, public navParams: NavParams, public database: Database) {
  		console.log("hii");
      this.initializePage();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ScientificProgrammePage');
  	}

  	initializePage(){
	    this.database.getSessions().then(data => {
        console.log(data);
		    this.sessions = data;
		    for (var i = 0; i < this.sessions.length; i++) {
			    if(this.sessions[i].start_date == "2019-01-12"){
			    	this.day1.push({
			    		session_id: this.sessions[i].session_id,
              session_name: this.sessions[i].session_name,
              title: this.sessions[i].title,
              type: this.sessions[i].type,
              moderator: this.sessions[i].moderator,
              chairman: this.sessions[i].chairman,
              start_date: this.sessions[i].start_date,
              start_time: this.sessions[i].start_time,
              end_time: this.sessions[i].end_time
			    	})
			    }
			   	else{
				    this.day2.push({
              session_id: this.sessions[i].session_id,
              session_name: this.sessions[i].session_name,
              title: this.sessions[i].title,
              type: this.sessions[i].type,
              moderator: this.sessions[i].moderator,
              chairman: this.sessions[i].chairman,
              start_date: this.sessions[i].start_date,
              start_time: this.sessions[i].start_time,
              end_time: this.sessions[i].end_time
            })
          }
        }
		  })
  	}

  	onSegmentSelected(val){
  		console.log(val);
  		this.days = val;
  	}

  	sessionDetails(session_id, session_name, session_title, moderator, chairman){
  		this.navCtrl.push(SessionDetailsPage, { session_id: session_id, session_name: session_name, session_title: session_title, moderator: moderator, chairman: chairman });
  	}
}
