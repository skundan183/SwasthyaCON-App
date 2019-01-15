import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';

import { WelcomePage } from '../../pages/welcome/welcome';
import { MessagesPage } from '../../pages/messages/messages';
import { CommitteePage } from '../../pages/committee/committee';
import { FacultyPage } from '../../pages/faculty/faculty';
import { RegistrationPage } from '../../pages/registration/registration';
import { ScientificProgrammePage } from '../../pages/scientific-programme/scientific-programme';
import { MyConferencePage } from '../../pages/my-conference/my-conference';
import { TradePage } from '../../pages/trade/trade';
import { ContactPage } from '../../pages/contact/contact';
import { SharePage } from '../../pages/share/share';
import { LoginPage } from '../../pages/login/login';

import { Database } from './../../providers/database/database';
import { RestProvider } from './../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public items:any = [];
  	constructor(public navCtrl: NavController, public statusBar: StatusBar, public socialSharing: SocialSharing, public modalCtrl : ModalController, public storage: Storage, public restProvider: RestProvider, public database: Database) {
      statusBar.backgroundColorByHexString('#186AAB'); console.log("homepage");
      this.restProvider.getSProgramme().subscribe(
        data=> {
            this.items = data;console.log("homepage1");
            if(this.items.ErrorCode == 0){
              console.log(this.items.sessions);
              console.log(this.items.session_details);
              this.database.setSessions(this.items.sessions);
              this.database.setSessionDetails(this.items.session_details);
            }
            else{
              console.log(this.items.ErrorMessage);
            }
        },
        err=>{
            console.log(err);
        });
  	}

    openShare(){
      var sharePage = this.modalCtrl.create(SharePage, {cssClass: "transactionConfirm-modal"}); 
      sharePage.present();
    }


  	click(pagename){
  		if(pagename == "welcome"){
  			this.navCtrl.push(WelcomePage);
  		}
  		else if(pagename == "messages"){
  			this.navCtrl.push(MessagesPage);
  		}
  		else if(pagename == "committee"){
  			this.navCtrl.push(CommitteePage);
  		}
  		else if(pagename == "faculty"){
  			this.navCtrl.push(FacultyPage);
  		}
  		else if(pagename == "registration"){
  			this.navCtrl.push(RegistrationPage);
  		}
  		else if(pagename == "scientific-programme"){
        console.log("hii5");
  			this.navCtrl.push(ScientificProgrammePage);
  		}
  		else if(pagename == "my-swasthyacon"){
  			this.openLogin();
  		}
  		else if(pagename == "trade"){
  			this.navCtrl.push(TradePage);
  		}
  		else if(pagename == "contact"){
  			this.navCtrl.push(ContactPage);
  		}
  	}

    openLogin(){
      this.storage.get('login_id').then((login_id) => {
          console.log(login_id);
          if((login_id != '') && (login_id != undefined) && (login_id != null)){
            this.navCtrl.push(MyConferencePage);
          }
          else{
            this.navCtrl.push(LoginPage);
          }
      });
    }
}
