import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the ShowImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-show-image',
  templateUrl: 'show-image.html',
})
export class ShowImagePage {

	image:any;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public photoViewer: PhotoViewer) {
  		this.image = navParams.get('image');
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ShowImagePage');
  	}

  	onClick(val){
  		this.photoViewer.show(val);
  	}

    close(){
      this.navCtrl.setRoot(HomePage);
    }

}
