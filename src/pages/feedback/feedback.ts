import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RestProvider } from './../../providers/rest/rest';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

	ret1_icon1 = "ios-star-outline";
	ret1_icon2 = "ios-star-outline";
	ret1_icon3 = "ios-star-outline";
	ret1_icon4 = "ios-star-outline";
	ret1_icon5 = "ios-star-outline";
	ret2_icon1 = "ios-star-outline";
	ret2_icon2 = "ios-star-outline";
	ret2_icon3 = "ios-star-outline";
	ret2_icon4 = "ios-star-outline";
	ret2_icon5 = "ios-star-outline";
	ret3_icon1 = "ios-star-outline";
	ret3_icon2 = "ios-star-outline";
	ret3_icon3 = "ios-star-outline";
	ret3_icon4 = "ios-star-outline";
	ret3_icon5 = "ios-star-outline";
	ret4_icon1 = "ios-star-outline";
	ret4_icon2 = "ios-star-outline";
	ret4_icon3 = "ios-star-outline";
	ret4_icon4 = "ios-star-outline";
	ret4_icon5 = "ios-star-outline";
	ret5_icon1 = "ios-star-outline";
	ret5_icon2 = "ios-star-outline";
	ret5_icon3 = "ios-star-outline";
	ret5_icon4 = "ios-star-outline";
	ret5_icon5 = "ios-star-outline";
	total:any = 5;
	ret1:any = 0;
	ret2:any = 0;
	ret3:any = 0;
	ret4:any = 0;
	ret5:any = 0;
	comments:any = "";
	public items:any = [];
	public regno = "";
	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public storage: Storage) {
  		this.storage.get('login_id').then((login_id) => {
        	this.regno = login_id;
      	});
      	console.log(this.regno);
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad FeedbackPage');
  	}

  	ret1_clicked(ret1_val){
  		console.log(ret1_val);
  		this.ret1 = ret1_val;
  		if(ret1_val == 1){
  			this.ret1_icon1 = "ios-star";
			this.ret1_icon2 = "ios-star-outline";
			this.ret1_icon3 = "ios-star-outline";
			this.ret1_icon4 = "ios-star-outline";
			this.ret1_icon5 = "ios-star-outline";
  		}
  		else if(ret1_val == 2){
  			this.ret1_icon1 = "ios-star";
			this.ret1_icon2 = "ios-star";
			this.ret1_icon3 = "ios-star-outline";
			this.ret1_icon4 = "ios-star-outline";
			this.ret1_icon5 = "ios-star-outline";
  		}
  		else if(ret1_val == 3){
  			this.ret1_icon1 = "ios-star";
			this.ret1_icon2 = "ios-star";
			this.ret1_icon3 = "ios-star";
			this.ret1_icon4 = "ios-star-outline";
			this.ret1_icon5 = "ios-star-outline";
  		}
  		else if(ret1_val == 4){
  			this.ret1_icon1 = "ios-star";
			this.ret1_icon2 = "ios-star";
			this.ret1_icon3 = "ios-star";
			this.ret1_icon4 = "ios-star";
			this.ret1_icon5 = "ios-star-outline";
  		}
  		else{
  			this.ret1_icon1 = "ios-star";
			this.ret1_icon2 = "ios-star";
			this.ret1_icon3 = "ios-star";
			this.ret1_icon4 = "ios-star";
			this.ret1_icon5 = "ios-star";
  		}
  	}

  	ret2_clicked(ret2_val){
  		console.log(ret2_val);
  		this.ret2 = ret2_val;
  		if(ret2_val == 1){
  			this.ret2_icon1 = "ios-star";
			this.ret2_icon2 = "ios-star-outline";
			this.ret2_icon3 = "ios-star-outline";
			this.ret2_icon4 = "ios-star-outline";
			this.ret2_icon5 = "ios-star-outline";
  		}
  		else if(ret2_val == 2){
  			this.ret2_icon1 = "ios-star";
			this.ret2_icon2 = "ios-star";
			this.ret2_icon3 = "ios-star-outline";
			this.ret2_icon4 = "ios-star-outline";
			this.ret2_icon5 = "ios-star-outline";
  		}
  		else if(ret2_val == 3){
  			this.ret2_icon1 = "ios-star";
			this.ret2_icon2 = "ios-star";
			this.ret2_icon3 = "ios-star";
			this.ret2_icon4 = "ios-star-outline";
			this.ret2_icon5 = "ios-star-outline";
  		}
  		else if(ret2_val == 4){
  			this.ret2_icon1 = "ios-star";
			this.ret2_icon2 = "ios-star";
			this.ret2_icon3 = "ios-star";
			this.ret2_icon4 = "ios-star";
			this.ret2_icon5 = "ios-star-outline";
  		}
  		else{
  			this.ret2_icon1 = "ios-star";
			this.ret2_icon2 = "ios-star";
			this.ret2_icon3 = "ios-star";
			this.ret2_icon4 = "ios-star";
			this.ret2_icon5 = "ios-star";
  		}
  	}

  	ret3_clicked(ret3_val){
  		console.log(ret3_val);
  		this.ret3 = ret3_val;
  		if(ret3_val == 1){
  			this.ret3_icon1 = "ios-star";
			this.ret3_icon2 = "ios-star-outline";
			this.ret3_icon3 = "ios-star-outline";
			this.ret3_icon4 = "ios-star-outline";
			this.ret3_icon5 = "ios-star-outline";
  		}
  		else if(ret3_val == 2){
  			this.ret3_icon1 = "ios-star";
			this.ret3_icon2 = "ios-star";
			this.ret3_icon3 = "ios-star-outline";
			this.ret3_icon4 = "ios-star-outline";
			this.ret3_icon5 = "ios-star-outline";
  		}
  		else if(ret3_val == 3){
  			this.ret3_icon1 = "ios-star";
			this.ret3_icon2 = "ios-star";
			this.ret3_icon3 = "ios-star";
			this.ret3_icon4 = "ios-star-outline";
			this.ret3_icon5 = "ios-star-outline";
  		}
  		else if(ret3_val == 4){
  			this.ret3_icon1 = "ios-star";
			this.ret3_icon2 = "ios-star";
			this.ret3_icon3 = "ios-star";
			this.ret3_icon4 = "ios-star";
			this.ret3_icon5 = "ios-star-outline";
  		}
  		else{
  			this.ret3_icon1 = "ios-star";
			this.ret3_icon2 = "ios-star";
			this.ret3_icon3 = "ios-star";
			this.ret3_icon4 = "ios-star";
			this.ret3_icon5 = "ios-star";
  		}
  	}

  	ret4_clicked(ret4_val){
  		console.log(ret4_val);
  		this.ret4 = ret4_val;
  		if(ret4_val == 1){
  			this.ret4_icon1 = "ios-star";
			this.ret4_icon2 = "ios-star-outline";
			this.ret4_icon3 = "ios-star-outline";
			this.ret4_icon4 = "ios-star-outline";
			this.ret4_icon5 = "ios-star-outline";
  		}
  		else if(ret4_val == 2){
  			this.ret4_icon1 = "ios-star";
			this.ret4_icon2 = "ios-star";
			this.ret4_icon3 = "ios-star-outline";
			this.ret4_icon4 = "ios-star-outline";
			this.ret4_icon5 = "ios-star-outline";
  		}
  		else if(ret4_val == 3){
  			this.ret4_icon1 = "ios-star";
			this.ret4_icon2 = "ios-star";
			this.ret4_icon3 = "ios-star";
			this.ret4_icon4 = "ios-star-outline";
			this.ret4_icon5 = "ios-star-outline";
  		}
  		else if(ret4_val == 4){
  			this.ret4_icon1 = "ios-star";
			this.ret4_icon2 = "ios-star";
			this.ret4_icon3 = "ios-star";
			this.ret4_icon4 = "ios-star";
			this.ret4_icon5 = "ios-star-outline";
  		}
  		else{
  			this.ret4_icon1 = "ios-star";
			this.ret4_icon2 = "ios-star";
			this.ret4_icon3 = "ios-star";
			this.ret4_icon4 = "ios-star";
			this.ret4_icon5 = "ios-star";
  		}
  	}

  	ret5_clicked(ret5_val){
  		console.log(ret5_val);
  		this.ret5 = ret5_val;
  		if(ret5_val == 1){
  			this.ret5_icon1 = "ios-star";
			this.ret5_icon2 = "ios-star-outline";
			this.ret5_icon3 = "ios-star-outline";
			this.ret5_icon4 = "ios-star-outline";
			this.ret5_icon5 = "ios-star-outline";
  		}
  		else if(ret5_val == 2){
  			this.ret5_icon1 = "ios-star";
			this.ret5_icon2 = "ios-star";
			this.ret5_icon3 = "ios-star-outline";
			this.ret5_icon4 = "ios-star-outline";
			this.ret5_icon5 = "ios-star-outline";
  		}
  		else if(ret5_val == 3){
  			this.ret5_icon1 = "ios-star";
			this.ret5_icon2 = "ios-star";
			this.ret5_icon3 = "ios-star";
			this.ret5_icon4 = "ios-star-outline";
			this.ret5_icon5 = "ios-star-outline";
  		}
  		else if(ret5_val == 4){
  			this.ret5_icon1 = "ios-star";
			this.ret5_icon2 = "ios-star";
			this.ret5_icon3 = "ios-star";
			this.ret5_icon4 = "ios-star";
			this.ret5_icon5 = "ios-star-outline";
  		}
  		else{
  			this.ret5_icon1 = "ios-star";
			this.ret5_icon2 = "ios-star";
			this.ret5_icon3 = "ios-star";
			this.ret5_icon4 = "ios-star";
			this.ret5_icon5 = "ios-star";
  		}
  	}

  	submit(comments){
  		console.log(comments);
  		console.log(this.ret1+" "+this.ret2+" "+this.ret3+" "+this.ret4+" "+this.ret5);
  		
  		var toaster = this.toastCtrl.create({
	        duration: 3000,
	        position: 'bottom'
	    });

      	if(this.ret1 == 0 || this.ret2 == 0 || this.ret3 == 0 || this.ret4 == 0 || this.ret5 == 0){
        	toaster.setMessage('Select at least one star for every type.');
        	toaster.present();
        	return false;
      	}

      	let loading = this.loadingCtrl.create({content:'Sending data, please wait....'});
      	loading.present();

      	this.restProvider.sendFeedback(this.regno, this.ret1, this.ret2, this.ret3, this.ret4, this.ret5, comments).subscribe(
        	data=> {
	          loading.dismissAll();
	          this.items = data;
	          if(this.items.ErrorCode == 0){
	          	this.presentAlert('Thank You!', this.items.ErrorMessage);
	          	this.navCtrl.pop();
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
        buttons: ['OK']
      });
      alert.present();
    }
}
