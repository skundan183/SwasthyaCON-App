import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../../pages/home/home';
import { ProfilePage } from '../../pages/profile/profile';
import { VotingPage } from '../../pages/voting/voting';
import { FeedbackPage } from '../../pages/feedback/feedback';
import { AskQuestionPage } from '../../pages/ask-question/ask-question';
/**
 * Generated class for the MyConferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-conference',
  templateUrl: 'my-conference.html',
})
export class MyConferencePage {

    @ViewChild(Nav) nav: Nav;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  	
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MyConferencePage');
  	}

  	click(pagename){
  		if(pagename == "profile"){
  			this.navCtrl.push(ProfilePage);
  		}
  		else if(pagename == "voting"){
  			this.navCtrl.push(VotingPage);
  		}
  		else if(pagename == "ask_question"){
  			this.navCtrl.push(AskQuestionPage);
  		}
      else if(pagename == "feedback"){
        this.navCtrl.push(FeedbackPage);
      }
  		else if(pagename == "home"){
  			this.navCtrl.setRoot(HomePage);
  		}
      else if(pagename == "logout"){
        this.storage.remove('login_id');
        this.navCtrl.setRoot(HomePage);
      }
  	}

}
