import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';
import { RestProvider } from './../../providers/rest/rest';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

    public result : any = [];
    public items : any = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, public photoViewer: PhotoViewer, public restProvider: RestProvider) {
	  	restProvider.getMessage().subscribe(data=> {
            console.log(data);
            this.result = data
            if(this.result['ErrorCode'] == 0){
            	this.items = this.result.data;
            }
        },
        err=>{
        	console.log(err);
        });
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad MessagesPage');
  	}

  	showImage(image){
  		this.photoViewer.show(image);
  	}

}
