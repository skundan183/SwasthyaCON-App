import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

//import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the OnlineRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-online-registration',
  templateUrl: 'online-registration.html',
})
export class OnlineRegistrationPage {

    public items : any = [];
    public data:any = [];
    public div_payment_type = "";
    public div_payment_method = "";
    public photo: File;
    public photo_base64 = "";
    public scan_file: File;
    public eventPhotoFile : any = [];
    public eventScanFile : any = [];

    options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        hidenavigationbuttons : 'yes',
        hideurlbar : 'yes',
        zoom : 'no',//Android only ,shows browser zoom controls 
        hardwareback : 'no',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        closebuttoncolor : '#0069b0',
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };

  	constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser, private spinnerDialog: SpinnerDialog, public navParams: NavParams, private alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public restProvider: RestProvider) {
      this.initilizePage();
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad OnlineRegistrationPage');
  	}

    initilizePage(){
      this.div_payment_type = "";
      this.div_payment_method = "";
      this.eventPhotoFile = [];
      this.eventScanFile = [];
      this.data.fname = "";
      this.data.lname = "";
      this.data.mname = "";
      this.data.gender = "Male";
      this.data.photo = null;
      this.data.qualification = "";
      this.data.speciality = "";
      this.data.mci_regno = "";
      this.data.email = "";
      this.data.mobile = "";
      this.data.address = "";
      this.data.city = "";
      this.data.state = "";
      this.data.country = "";
      this.data.pincode = "";
      this.data.contactno = "";
      this.data.delegate_type = "";
      this.data.acc_person = "No";
      this.data.no_of_acc_person = "1";
      this.data.acc_person_name1 = "";
      this.data.acc_person_name2 = "";

      this.data.currency = "INR";
      this.data.amount = 0;
      this.data.total_payable_amount = this.data.currency+" "+this.data.amount;

      this.data.payment_type = "";
      this.data.payment_method = "";

      this.data.cheque_chequeno = "";
      this.data.cheque_bank_name = "";
      this.data.cheque_branch_name = "";
      this.data.cheque_scan_file = null;

      this.data.dd_ddno = "";
      this.data.dd_bank_name = "";
      this.data.dd_branch_name = "";
      this.data.dd_scan_file = null;

      this.data.rtgs_accno = "";
      this.data.rtgs_bank_name = "";
      this.data.rtgs_branch_name = "";
      this.data.rtgs_accholder_name = "";
      this.data.rtgs_transaction_id = "";
      this.data.rtgs_transaction_date = "";
      this.data.rtgs_scan_file = null;
    }
    

    register(formdata){
      var toaster = this.toastCtrl.create({
        duration: 3000,
        position: 'bottom'
      });
      console.log(formdata);

      if(formdata.fname == '' || formdata.fname == undefined){
        toaster.setMessage('First Name is required');
        toaster.present();
        return false;
      }
      if(formdata.lname == '' || formdata.lname == undefined){
        toaster.setMessage('Last Name is required');
        toaster.present();
        return false;
      }
      if(formdata.gender == '' || formdata.gender == undefined){
        toaster.setMessage('Gender is required');
        toaster.present();
        return false;
      }
      if((!this.photo_base64) || this.photo_base64 == undefined){
        toaster.setMessage('Photo is required');
        toaster.present();
        return false;
      }
      if(formdata.qualification == '' || formdata.qualification == undefined){
        toaster.setMessage('Qualification is required');
        toaster.present();
        return false;
      }
      if(formdata.speciality == '' || formdata.speciality == undefined){
        toaster.setMessage('Speciality is required');
        toaster.present();
        return false;
      }
      if(formdata.mci_regno == '' || formdata.mci_regno == undefined){
        toaster.setMessage('MCI/Reg. is required');
        toaster.present();
        return false;
      }
      if(formdata.email == '' || formdata.email == undefined){
        toaster.setMessage('Email is required');
        toaster.present();
        return false;
      }
      if(formdata.mobile == '' || formdata.mobile == undefined){
        toaster.setMessage('Mobile no. is required');
        toaster.present();
        return false;
      }
      if(formdata.delegate_type == '' || formdata.delegate_type == undefined){
        toaster.setMessage('Delegate type is required');
        toaster.present();
        return false;
      }
      if(formdata.acc_person !== '' && formdata.acc_person !== undefined){
        if(formdata.acc_person == 'Yes'){
          if(formdata.no_of_acc_person == '1'){
            if(formdata.acc_person_name1 == '' || formdata.acc_person_name1 == undefined){
              toaster.setMessage('Accompanying person name is required');
              toaster.present();
              return false;
            }
          }
          if(formdata.no_of_acc_person == '2'){
            if(formdata.acc_person_name1 == '' || formdata.acc_person_name1 == undefined){
              toaster.setMessage('Accompanying person name is required');
              toaster.present();
              return false;
            }
            if(formdata.acc_person_name2 == '' || formdata.acc_person_name2 == undefined){
              toaster.setMessage('Accompanying person name is required');
              toaster.present();
              return false;
            }
          }
        }
      }
      if(formdata.currency == '' || formdata.currency == undefined){
        toaster.setMessage('Something went wrong. Please restart the app.');
        toaster.present();
        return false;
      }
      if(formdata.amount == '0'){
        toaster.setMessage('Something went wrong. Please restart the app.');
        toaster.present();
        return false;
      }
      if(formdata.payment_type != '' && formdata.payment_type != undefined){
        if(formdata.payment_type == "Offline"){
          if(formdata.payment_method != '' && formdata.payment_method != undefined){
            if(formdata.payment_method == "Cheque"){
              if(formdata.cheque_chequeno == '' || formdata.cheque_chequeno == undefined){
                toaster.setMessage('Cheque no. is required');
                toaster.present();
                return false;
              }
              if(formdata.cheque_bank_name == '' || formdata.cheque_bank_name == undefined){
                toaster.setMessage('Bank name is required');
                toaster.present();
                return false;
              }
              if(formdata.cheque_branch_name == '' || formdata.cheque_branch_name == undefined){
                toaster.setMessage('Branch name is required');
                toaster.present();
                return false;
              }
            }
            if(formdata.payment_method == "Demand Draft"){
              if(formdata.dd_ddno == '' || formdata.dd_ddno == undefined){
                toaster.setMessage('DD No. is required');
                toaster.present();
                return false;
              }
              if(formdata.dd_bank_name == '' || formdata.dd_bank_name == undefined){
                toaster.setMessage('Bank name is required');
                toaster.present();
                return false;
              }
              if(formdata.dd_branch_name == '' || formdata.dd_branch_name == undefined){
                toaster.setMessage('Branch name is required');
                toaster.present();
                return false;
              }
            }
            if(formdata.payment_method == "NEFT/RTGS"){
              if(formdata.rtgs_accno == '' || formdata.rtgs_accno == undefined){
                toaster.setMessage('Account no. is required');
                toaster.present();
                return false;
              }
              if(formdata.rtgs_accholder_name == '' || formdata.rtgs_accholder_name == undefined){
                toaster.setMessage('Account holder name is required');
                toaster.present();
                return false;
              }
              if(formdata.rtgs_bank_name == '' || formdata.rtgs_bank_name == undefined){
                toaster.setMessage('Bank name is required');
                toaster.present();
                return false;
              }
              if(formdata.rtgs_branch_name == '' || formdata.rtgs_branch_name == undefined){
                toaster.setMessage('Branch name is required');
                toaster.present();
                return false;
              }
              if(formdata.rtgs_transaction_id == '' || formdata.rtgs_transaction_id == undefined){
                toaster.setMessage('Transaction id is required');
                toaster.present();
                return false;
              }
              if(formdata.rtgs_transaction_date == '' || formdata.rtgs_transaction_date == undefined){
                toaster.setMessage('Transaction date is required');
                toaster.present();
                return false;
              }
            }
          }
          else{
            toaster.setMessage('Payment method is required');
            toaster.present();
            return false;
          }
        } 
      }
      else{
        toaster.setMessage('Payment type is required');
        toaster.present();
        return false;
      }

      let loading = this.loadingCtrl.create({content:'Sending data, please wait....'});
      loading.present();
      
      this.restProvider.register(formdata, this.photo_base64, this.scan_file).subscribe(
        data=> {
          loading.dismissAll();
          this.items = data;
          if(this.items.ErrorCode == 0){
            if(formdata.payment_type == "Online"){
              this.redirectToPayment(this.items.MemberID);
            }
            else{
              let alert = this.alertCtrl.create({
                title: "Success",
                subTitle: this.items.ErrorMessage,
                buttons: [{ text: 'Ok', handler: () => { this.initilizePage(); } }]
              });
              alert.present();
            }
          }
          else{
            this.presentAlert('Failed', this.items.ErrorMessage);
          }
        },
        err=>{
          loading.dismissAll();
          //console.log(err.status);
          //console.log(err.error);
          //console.log(err.headers);
          this.presentAlert('Error', "Failed to submit the form. Check your internet connection.");
        }
      );
    }

    redirectToPayment(member_id){
      let target = "_blank";
      let url = "http://swasthyacon.org/app/registration/payWithPaypal/"+member_id;
      let browser = this.inAppBrowser.create(url,target,this.options);

      browser.on('loadstart').subscribe((eve) => {
        this.spinnerDialog.show('Please wait...', null, true);
      }, err => {
        this.spinnerDialog.hide();
      });

      browser.on('loadstop').subscribe(()=>{
        this.spinnerDialog.hide();
      }, err =>{
        this.spinnerDialog.hide();
      });

      browser.on('loaderror').subscribe(()=>{
        this.spinnerDialog.hide();
      }, err =>{
        this.spinnerDialog.hide();
      });

      browser.on('exit').subscribe(()=>{
        this.spinnerDialog.hide();
        console.log('browser closed');
      }, err =>{
        this.spinnerDialog.hide();
      });

      this.initilizePage();
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

    changeScanFile($event): void {
      this.eventScanFile = event;
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        this.scan_file = (readerEvent.target as any).result;
      };
      reader.readAsDataURL(this.eventScanFile.target.files[0]);
    }


    paymentType(type) {
      if(type=="Online"){
        this.div_payment_type = "Online";
      }
      else{
        this.div_payment_type = "Offline";
      }
    }

    paymentMethod(type) {
      if(type == "Cheque"){
        this.div_payment_method = "Cheque";
      }
      else if(type == "Demand Draft"){
        this.div_payment_method = "Demand Draft";
      }
      else{
        this.div_payment_method = "NEFT/RTGS";
      }
    }

    calcAmount(val){
      var deltype = val.delegate_type;
      if(deltype != undefined){
        var acc_person = val.acc_person;
        var result = this.getAmount(deltype);
        if(acc_person == "Yes"){
          var no_of_acc_person = val.no_of_acc_person;
          var acc_amount = this.getAccAmount(deltype);
          if(no_of_acc_person == "1"){
            this.data.amount = result['amount'] + acc_amount['amount']; 
            this.data.currency = result['currency'];
            this.data.total_payable_amount = this.data.currency+" "+this.data.amount;
          }
          else{
            this.data.amount = result['amount'] + 2*acc_amount['amount']; 
            this.data.currency = result['currency'];
            this.data.total_payable_amount = this.data.currency+" "+this.data.amount;
          }
        }
        else{
          this.data.amount = result['amount']; 
          this.data.currency = result['currency'];
          this.data.total_payable_amount = this.data.currency+" "+this.data.amount;
        }
      }
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


    getAmount(deltype){
        var today = new Date().toISOString();
        var curr_date = Date.parse(today);
        var eb_date = Date.parse("2018-11-30"); //new Date(2018,10,30);
        var rr_date = Date.parse("2019-01-01"); //new Date(2018,11,31);
        var ots_date = Date.parse("2019-01-14"); //new Date(2019,00,10);
        var currency = "INR";
        var amount = 0;

        if(curr_date <= eb_date){
            if(deltype == "National Delegates"){
                currency = "INR";
                amount = 4000;
            }
            else if(deltype == "Students"){
                currency = "INR";
                amount = 2000;
            }
            else if(deltype == "HCPs"){
                currency = "INR";
                amount = 2000;
            }
            else if(deltype == "Corporate Delegates"){
                currency = "INR";
                amount = 7000;
            }
            else if(deltype == "Delegates + Accommodation"){
                currency = "INR";
                amount = 12000;
            }
            else if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 175;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }
        else if((curr_date > eb_date) && (curr_date <= rr_date)){
            if(deltype == "National Delegates"){
                currency = "INR";
                amount = 6000;
            }
            else if(deltype == "Students"){
                currency = "INR";
                amount = 3000;
            }
            else if(deltype == "HCPs"){
                currency = "INR";
                amount = 3000;
            }
            else if(deltype == "Corporate Delegates"){
                currency = "INR";
                amount = 9000;
            }
            else if(deltype == "Delegates + Accommodation"){
                currency = "INR";
                amount = 15000;
            }
            else if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 250;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }
        else if((curr_date > rr_date) && (curr_date <= ots_date)){
            if(deltype == "National Delegates"){
                currency = "INR";
                amount = 9000;
            }
            else if(deltype == "Students"){
                currency = "INR";
                amount = 3000;
            }
            else if(deltype == "HCPs"){
                currency = "INR";
                amount = 3000;
            }
            else if(deltype == "Corporate Delegates"){
                currency = "INR";
                amount = 10000;
            }
            else if(deltype == "Delegates + Accommodation"){
                currency = "INR";
                amount = 25000;
            }
            else if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 400;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }
        return {"currency":currency, "amount":amount};
    }

    getAccAmount(deltype){
        var today = new Date().toISOString();
        var curr_date = Date.parse(today);
        var eb_date = Date.parse("2018-11-30"); //new Date(2018,10,30);
        var rr_date = Date.parse("2018-12-31"); //new Date(2018,11,31);
        var ots_date = Date.parse("2019-01-13"); //new Date(2019,00,10);
        var currency = "INR";
        var amount = 0;

        if(curr_date <= eb_date){
            if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 100;
            }
            else if(deltype !== ""){
                currency = "INR";
                amount = 2000;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }
        else if((curr_date > eb_date) && (curr_date <= rr_date)){
            if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 100;
            }
            else if(deltype !== ""){
                currency = "INR";
                amount = 3000;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }
        else if((curr_date > rr_date) && (curr_date <= ots_date)){
            if(deltype == "International Delegates + Accommodation"){
                currency = "USD";
                amount = 100;
            }
            else if(deltype !== ""){
                currency = "INR";
                amount = 4000;
            }
            else{
                currency = "INR";
                amount = 0;
            }
        }         
        return {"currency":currency, "amount":amount};
    }


}
