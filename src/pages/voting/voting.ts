import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { RestProvider } from './../../providers/rest/rest';
/**
 * Generated class for the VotingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-voting',
  templateUrl: 'voting.html',
})
export class VotingPage {

    public selected_option = "";
    public correct_answer = "";
    public error_message = "";
    public result: any = [];
    public items: any = [];
    public vote_res: any = [];
    public regno = "";
    public question_id = "";
    public wait_msg = "";
    public disbale_submit = 0;
    public is_correct = "";
    public is_wrong = "";
    public is_result = 0;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public photoViewer: PhotoViewer, public restProvider: RestProvider, public storage: Storage) {
  		this.storage.get('login_id').then((login_id) => {
        	this.regno = login_id;
    	});

  		let loading = this.loadingCtrl.create({content:'Loading, please wait....', dismissOnPageChange: true});
    	loading.present();
  		restProvider.getActiveQuestion().subscribe(data=> {
  			loading.dismissAll();
            console.log(data);
            this.result = data;
            if(this.result['ErrorCode'] == 0){
            	this.items = this.result.data;
              this.question_id = this.items[0].question_id;
              this.correct_answer = this.items[0].correct_answer;
            }
            else{
            	this.error_message = this.result['ErrorMessage'];
            }
        },
        err=>{
        	loading.dismissAll();
        	console.log(err);
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad VotingPage');
  	}

  	onClick(val){
  		this.photoViewer.show(val);
  	}

  	selectedOption(val){
      if(this.wait_msg == ''){
  		  this.selected_option = val;
      }
  	}

  	submit(){
  		  var toaster = this.toastCtrl.create({
	        duration: 3000,
	        position: 'bottom'
        });

      	if(this.selected_option == ""){
        	toaster.setMessage('Select an option');
        	toaster.present();
        	return false;
      	}

      	let loading = this.loadingCtrl.create({
      		spinner: 'hide',
      		content: '<img class="loader_img" src="assets/imgs/bars.gif" /><p>Sending data, please wait....</p>',
      		dismissOnPageChange: true,
      		cssClass:'loader_img'
      	});
      	loading.present();

		    this.restProvider.submitAnswer(this.regno, this.question_id, this.selected_option).subscribe(
          data=> {
	          loading.dismissAll();
	          this.vote_res = data;
            console.log("ErrorCode:"+this.vote_res.ErrorCode);
	          if(this.vote_res.ErrorCode == 0){
              this.disbale_submit = 1;
              this.wait_msg = "please wait your result is processing....";
              this.sleep(5000).then(() => {
                this.wait_msg = "";
                this.is_result = 1;
                if(this.correct_answer == this.selected_option){
                  this.is_correct = this.selected_option;
                  this.selected_option = "";
                }
                else{
                  this.is_correct = this.correct_answer;
                  this.is_wrong = this.selected_option;
                  this.selected_option = "";
                }
              });
	          }
	          else{
	            this.presentAlert("Failed", this.vote_res.ErrorMessage);
	          }
	        },
	        err=>{
	          loading.dismissAll();
	          this.presentAlert("Failed", "Failed to pass the data. Check your internet connection.");
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

  	presentToast(message) {
  		let toast = this.toastCtrl.create({
		    message: message,
		    duration: 3000,
		    position: 'middle',
		    cssClass: 'toast_container',
		    dismissOnPageChange: true
		  });
      toast.present();
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}
