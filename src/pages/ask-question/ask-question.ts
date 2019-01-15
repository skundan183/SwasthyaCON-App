import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Database } from './../../providers/database/database';
import { RestProvider } from './../../providers/rest/rest';
/**
 * Generated class for the AskQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {

  	public sessions: any = [];
  	public items: any = [];
    public data: any = [];
    public result: any = [];
    public session_title = "";
    public regno = "";
  	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public database: Database, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public restProvider: RestProvider) {
  		this.storage.get('login_id').then((login_id) => {
        	this.regno = login_id;
      	});
  		this.initializePage();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AskQuestionPage');
  	}

  	initializePage(){
  		this.database.getSessions().then(data => {
        	console.log(data);
		    this.sessions = data;
		    for(var i = 0; i < this.sessions.length; i++) {
			    if(this.sessions[i].type == "1"){
			    	this.items.push({
			    		session_id: this.sessions[i].session_id,
              			session_name: this.sessions[i].session_name,
              			session_title: this.sessions[i].title,
			    	})
			    }
			}
		})
  	}

  	setTitle(val){
  		for(var i = 0; i < this.items.length; i++) {
  			if(this.items[i].session_name == val.session_name){
  				this.session_title = this.items[i].session_title;
  			}
  		}
  	}

  	submitQuestion(data){
  		var toaster = this.toastCtrl.create({
	        duration: 3000,
	        position: 'bottom'
	    });

      	if(data.session_name == "" || data.session_name == undefined){
        	toaster.setMessage('Select a session type');
        	toaster.present();
        	return false;
      	}
      	if(data.question == "" || data.question == undefined){
        	toaster.setMessage('Question is required');
        	toaster.present();
        	return false;
      	}

      	let loading = this.loadingCtrl.create({content:'Sending data, please wait....'});
      	loading.present();

      	this.restProvider.submitAskedQuestion(this.regno, data.session_name, data.question).subscribe(
        	data=> {
	          loading.dismissAll();
	          this.result = data;
	          if(this.result.ErrorCode == 0){
	          	this.presentAlert('Thank You!', this.result.ErrorMessage);
	          	this.navCtrl.pop();
	          }
	          else{
	            this.presentAlert('Failed', this.result.ErrorMessage);
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
        buttons: ['OK']
      });
      alert.present();
    }
}
