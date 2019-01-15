import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RestProvider } from './../../providers/rest/rest';
import { Database } from './../../providers/database/database';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

	public type = "";
	public userdata:any = [];
	public regno = "";
	public formdata:any = [];
	public items:any = [];
	public photo: File;
	public photo_base64 = "";
    public eventPhotoFile : any = [];
  	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController, public viewCtrl : ViewController, public loadingCtrl: LoadingController, public restProvider: RestProvider, public database: Database, public storage: Storage) {
  		this.type = this.navParams.get('type');
  		this.userdata = this.navParams.get('userdata');
  		console.log(this.userdata);
  		this.storage.get('login_id').then((login_id) => {
        	this.regno = login_id;
      	});
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad EditProfilePage');
  	}

  	closeModal(){
    	this.viewCtrl.dismiss();
	}

  	update(formdata){ console.log(this.photo_base64);
  	  	var toaster = this.toastCtrl.create({
        	duration: 3000,
        	position: 'bottom'
      	});
      	console.log(formdata);

      	if(this.type == 'name'){
	      	if(formdata.fname == '' || formdata.fname == undefined){
	        	toaster.setMessage('First name is required');
	        	toaster.present();
	        	return false;
	      	}
	      	if(formdata.lname == '' || formdata.lname == undefined){
	        	toaster.setMessage('Last name is required');
	        	toaster.present();
	        	return false;
	      	}
      	}
      	if(this.type == 'email' && (formdata.email == '' || formdata.email == undefined)){
        	toaster.setMessage('Email is required');
        	toaster.present();
        	return false;
      	}
  		if(this.type == 'mobile' && (formdata.mobile == '' || formdata.mobile == undefined)){
        	toaster.setMessage('Mobile No. is required');
        	toaster.present();
        	return false;
      	}
      	if(this.type == 'mci_regno' && (formdata.mci_regno == '' || formdata.mci_regno == undefined)){
        	toaster.setMessage('MCI / Reg No. is required');
        	toaster.present();
        	return false;
      	}
      	if(this.type == 'photo' && ((!this.photo_base64) || this.photo_base64 == undefined)){
        	toaster.setMessage('Photo is required');
        	toaster.present();
        	return false;
      	}

      	let loading = this.loadingCtrl.create({content:'Logging in, please wait....'});
      	loading.present();

	    this.restProvider.updateProfile(this.type, formdata, this.regno, this.photo_base64).subscribe(
	        data=> {
	          loading.dismissAll();
	          this.items = data;
	          if(this.items.ErrorCode == 0){
	            this.database.addUser(this.items.data[0]);
	            this.viewCtrl.dismiss();
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

    changePhoto($event): void {
      this.eventPhotoFile = event;
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.photo = (readerEvent.target as any).result;
        this.generateFromImage(this.photo);
      };
      reader.readAsDataURL(this.eventPhotoFile.target.files[0]);
    }

    generateFromImage(img) {
    	var canvas: any = document.createElement("canvas");
    	var image = new Image();

    	image.onload = () => {
      		var width = image.width;
      		var height = image.height;
 			var MAX_WIDTH = 400;
 			var MAX_HEIGHT = 300;
      		if (width > height) {
        		if (width > MAX_WIDTH) {
          			height *= MAX_WIDTH / width;
          			width = MAX_WIDTH;
        		}
      		} 
      		else {
        		if (height > MAX_HEIGHT) {
          			width *= MAX_HEIGHT / height;
          			height = MAX_HEIGHT;
        		}
      		}
      		canvas.width = width;
      		canvas.height = height;
      		var ctx = canvas.getContext("2d");
 
      		ctx.drawImage(image, 0, 0, width, height);
      		var dataUrl = canvas.toDataURL('image/jpeg');
 			this.photo_base64 = dataUrl;
 			console.log(this.photo_base64);
    	}
    	image.src = img;
  	}
}
