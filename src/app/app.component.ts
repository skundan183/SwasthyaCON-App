import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImageViewerController } from "ionic-img-viewer";

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { MessagesPage } from '../pages/messages/messages';
import { CommitteePage } from '../pages/committee/committee';
import { FacultyPage } from '../pages/faculty/faculty';
import { RegistrationPage } from '../pages/registration/registration';
import { ScientificProgrammePage } from '../pages/scientific-programme/scientific-programme';
import { TradePage } from '../pages/trade/trade';
import { ShowImagePage } from '../pages/show-image/show-image';
import { ContactPage } from '../pages/contact/contact';
import { SubscribePage } from '../pages/subscribe/subscribe';

import { RestProvider } from '../providers/rest/rest';
import { Database } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any = HomePage;
  token = "";
  uuid = "";
  platform = "";
  @ViewChild(Nav) nav: Nav;
  is_notification:any = 0;
  constructor(platform: Platform, private storage: Storage, backgroundMode: BackgroundMode, fcm: FCM, imageViewer: ImageViewerController, photoViewer: PhotoViewer, statusBar: StatusBar, splashScreen: SplashScreen, network: Network, private toastCtrl: ToastController, device: Device, uniqueDeviceID: UniqueDeviceID, public restProvider: RestProvider, public database: Database) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#186AAB');
      splashScreen.hide();

      this.platform = device.platform;

      backgroundMode.setDefaults({ silent: true });
      backgroundMode.enable();

      this.database.connectToDb();
      
      network.onDisconnect().subscribe(() => {
        restProvider.networkState = false;
        let toast = this.toastCtrl.create({
          message: 'No Internet Connection',
          duration: 3000
        });
        toast.present();
      });

      network.onConnect().subscribe(() => {
        restProvider.networkState = true;
        let toast = this.toastCtrl.create({
          message: 'You are connected to internet.',
          duration: 3000
        });
        toast.present();
      });

      fcm.getToken()
        .then(token => {
          console.log("token:"+token);
          storage.set('token', token);
        })
        .catch(error => console.error('Error getting token', error));

      uniqueDeviceID.get()
        .then((uuid: any) => {
          storage.set('uuid', uuid);
        })
        .catch((error: any) => console.log(error));

      this.storage.get('token').then((token) => {
        this.storage.get('uuid').then((uuid) => {
          if(network.type != 'none'){
            this.restProvider.regDeviceToken(token, uuid, this.platform).subscribe(
              data=> {
                console.log(data);
              },
              err=>{});
          }
        });
      });

      fcm.onNotification().subscribe( data => {
        this.is_notification = 1;
        if(data.wasTapped){
          console.log(data);
          if(data.page == "Messages"){
            if(data.image == '' || data.image == null){
              this.nav.push(MessagesPage);
            }
            else{
              this.nav.push(ShowImagePage, {"image": data.image});
            }
          }
          else if(data.page == "Welcome"){
            this.nav.push(WelcomePage);
          }
          else if(data.page == "Registration"){
            this.nav.push(RegistrationPage);
          }
          else if(data.page == "Committee"){
            this.nav.push(CommitteePage);
          }
          else if(data.page == "Faculty"){
            this.nav.push(FacultyPage);
          }
          else if(data.page == "Scientific"){
            this.nav.push(ScientificProgrammePage);
          }
          else if(data.page == "Trade"){
            this.nav.push(TradePage);
          }
          else if(data.page == "Contact"){
            this.nav.push(ContactPage);
          }
          else{
            this.nav.setRoot(HomePage);
          }
        }
        else{
          console.log(data);
        }
      });

    });
    this.checkSubscribe();
  }

  checkSubscribe(){
    console.log("Not: "+this.is_notification);
    if(this.is_notification == 0){
      this.storage.get('subscribe').then((subscribe) => {
        if((subscribe == '2') || (subscribe == '') || (subscribe == null)){
          this.nav.push(SubscribePage);
        }
      });
    }
  }

}

