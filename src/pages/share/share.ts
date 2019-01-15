import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  	constructor(public navCtrl: NavController, public navParams: NavParams, public socialSharing: SocialSharing, public viewCtrl : ViewController) {
  
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SharePage');
  	}

  	closeModal(){
    	this.viewCtrl.dismiss();
	}


	share(type){
		var title = "";
		var message = "";
		var url = "";
		if(type == "facebook"){
			title = "Fadcebook Share";
			message = "Like us on Facebook";
			url = "https://www.facebook.com/swasthyadiabetes/";
			this.socialSharing.share(message, title, null, url);
		}
		if(type == "twitter"){
			title = "Twitter Share";
			message = "Follow us on Twitter";
			url = "https://twitter.com/swasthyadiabete";
			this.socialSharing.share(message, title, null, url);
		}
		if(type == "linkedin"){
			title = "Linkedin Share";
			message = "Connect with us on Linkedin";
			url = "https://www.linkedin.com/in/swasthya-diabetes-care-01b11051/";
			this.socialSharing.share(message, title, null, url);
		}
		if(type == "instagram"){
			title = "Instagram Share";
			message = "Follow us on Instagram";
			url = "https://www.instagram.com/swasthya_diabetes_care/";
			this.socialSharing.share(message, title, null, url);
		}
		if(type == "apple"){
			message = "Download SwasthyaCON App";
			url = "https://itunes.apple.com/nz/app/swasthyacon/id1439288423?mt=8";
			this.socialSharing.share(message, null, null, url);
		}
		if(type == "android"){
			message = "Download SwasthyaCON App";
			url = "https://play.google.com/store/apps/details?id=com.cmpl.swasthyacon";
			this.socialSharing.share(message, null, null, url);
		}
		if(type == "both-app"){
			message = "Download SwasthyaCON App \n\n For iOS: https://itunes.apple.com/nz/app/swasthyacon/id1439288423?mt=8 \n\n For Android: https://play.google.com/store/apps/details?id=com.cmpl.swasthyacon";
			this.socialSharing.share(message, null, null, null);
		}
	}

}
