import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json; boundary=xxxxBoundaryStringxxxx' })
	};

@Injectable()
export class RestProvider {

	public networkState:boolean = false;

	baseUrlLive:string = "https://swasthyacon.org/app/";
	baseUrlUAT:string = "http://192.168.0.206:8080/SwasthyaCON_APP/";
  	constructor(public http: HttpClient) {
    	console.log('Hello RestProvider Provider');
    	if(!this.networkState){
    		console.log("failed");
    	}
  	}

  
  	register(data, photo, scan_file){
	    let postData = {
	            "fname": data.fname,
	            "mname": data.mname,
	            "lname": data.lname,
	            "gender": data.gender,
	            "photo_file": photo,
	            "qualification": data.qualification,
	            "speciality": data.speciality,
	            "mci_regno": data.mci_regno,
	            "email": data.email,
	            "mobile": data.mobile,
	            "address": data.address,
	            "city": data.city,
	            "state": data.state,
	            "country": data.country,
	            "pincode": data.pincode,
	            "contactno": data.contactno,
	            "delegate_type": data.delegate_type,
	            "acc_person": data.acc_person,
	            "no_of_acc_person": data.no_of_acc_person,
	            "acc_person_name1": data.acc_person_name1,
	            "acc_person_name2": data.acc_person_name2,
	            "total_payable_amount": data.total_payable_amount,
	            "payment_type": data.payment_type,
	            "offline_payment_method": data.payment_method,
	            "currency": data.currency,
	            "amount": data.amount,
	            "cheque_chequeno": data.cheque_chequeno,
	            "cheque_bank_name": data.cheque_bank_name,
	            "cheque_branch_name": data.cheque_branch_name,
	            "dd_ddno": data.dd_ddno,
	            "dd_bank_name": data.dd_bank_name,
	            "dd_branch_name": data.dd_branch_name,
	            "rtgs_accno": data.rtgs_accno,
	            "rtgs_bank_name": data.rtgs_bank_name,
	            "rtgs_branch_name": data.rtgs_branch_name,
	            "rtgs_accholder_name": data.rtgs_accholder_name,
	            "rtgs_transaction_id": data.rtgs_transaction_id,
	            "rtgs_transaction_date": data.rtgs_transaction_date,
	            "scan_file": scan_file
	    }
	    console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=MemberRegister', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	regDeviceToken(token, uuid, platform){
  		let postData = {
	            "device_token": token,
	            "uuid": uuid,
	            "platform": platform
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=AddDeviceToken', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	getMessage(){
    	var response = this.http.get(this.baseUrlLive+'read.php?value=GetMessage');   
    	return response;
  	}

  	login(data){
  		let postData = {
	            "regno": data.regno,
	            "email_mobile": data.email_mobile
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=LoginAuthentication', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	subscribe(data){
  		let postData = {
	            "name": data.name,
	            "email": data.email,
	            "mobile": data.mobile
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=Subscribe', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	updateProfile(type, data, regno, photo){
  		let	postData = {
  				"type": type,
  				"regno": regno,
	            "fname": data.fname,
	            "mname": data.mname,
	            "lname": data.lname,
	            "email": data.email,
	            "mobile": data.mobile,
	            "mci_regno": data.mci_regno,
	            "photo_file": photo
	    	}
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=UpdateProfile', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	getSProgramme(){
    	var response = this.http.get(this.baseUrlLive+'read.php?value=GetScientificProgramme');   
    	return response;
  	}

  	sendFeedback(reg_id, ret1, ret2, ret3, ret4, ret5, comments){
  		let postData = {
  				"registration_id": reg_id,
	            "ret1": ret1,
	            "ret2": ret2,
	            "ret3": ret3,
	            "ret4": ret4,
	            "ret5": ret5,
	            "comments": comments
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=Feedback', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	getActiveQuestion(){
    	var response = this.http.get(this.baseUrlLive+'read.php?value=GetActiveQuestion');   
    	return response;
  	}

  	submitAnswer(reg_id, question_id, selected_answer){
  		let postData = {
  				"registration_id": reg_id,
  				"question_id": question_id,
	            "selected_answer": selected_answer
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=SubmitAnswer', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}

  	submitAskedQuestion(reg_id, session_name, question){
  		let postData = {
  				"registration_id": reg_id,
  				"question": question,
  				"session_name": session_name
	    }
  		console.log(postData);
  		var response = this.http.post(this.baseUrlLive+'read.php?value=SubmitAskedQuestion', postData, httpOptions);
	  	console.log(response);
      	return response;
  	}
}
