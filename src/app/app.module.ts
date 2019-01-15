import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
import { HttpClientModule } from  '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { MessagesPage } from '../pages/messages/messages';
import { CommitteePage } from '../pages/committee/committee';
import { FacultyPage } from '../pages/faculty/faculty';
import { RegistrationPage } from '../pages/registration/registration';
import { ScientificProgrammePage } from '../pages/scientific-programme/scientific-programme';
import { MyConferencePage } from '../pages/my-conference/my-conference';
import { TradePage } from '../pages/trade/trade';
import { ShowImagePage } from '../pages/show-image/show-image';
import { ContactPage } from '../pages/contact/contact';
import { SharePage } from '../pages/share/share';
import { OnlineRegistrationPage } from '../pages/online-registration/online-registration';
import { ProfilePage } from '../pages/profile/profile';
import { VotingPage } from '../pages/voting/voting';
import { FeedbackPage } from '../pages/feedback/feedback';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SessionDetailsPage } from '../pages/session-details/session-details';
import { AskQuestionPage } from '../pages/ask-question/ask-question';

import { RestProvider } from '../providers/rest/rest';
import { Database } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    MessagesPage,
    CommitteePage,
    FacultyPage,
    RegistrationPage,
    ScientificProgrammePage,
    MyConferencePage,
    TradePage,
    ShowImagePage,
    ContactPage,
    SharePage,
    OnlineRegistrationPage,
    ProfilePage,
    VotingPage,
    FeedbackPage,
    SubscribePage,
    EditProfilePage,
    SessionDetailsPage,
    AskQuestionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WelcomePage,
    MessagesPage,
    CommitteePage,
    FacultyPage,
    RegistrationPage,
    ScientificProgrammePage,
    MyConferencePage,
    TradePage,
    ShowImagePage,
    ContactPage,
    SharePage,
    OnlineRegistrationPage,
    ProfilePage,
    VotingPage,
    FeedbackPage,
    SubscribePage,
    EditProfilePage,
    SessionDetailsPage,
    AskQuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    UniqueDeviceID,
    Device,
    FCM,
    InAppBrowser,
    SpinnerDialog,
    SocialSharing,
    BackgroundMode,
    PhotoViewer,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Database
  ]
})
export class AppModule {}
