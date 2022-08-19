import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { LoadingProvider } from '../providers/loading/loading';
import { ToastProvider } from '../providers/toast/toast';
import { AlertProvider } from '../providers/alert/alert';
import { DataUtilsProvider } from '../providers/data-utils/data-utils';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountPage } from '../pages/account/create-account/create-account';
import { ContactPage } from '../pages/contact/contact';
import { BankSlipPage } from '../pages/bank-slip/bank-slip';
import { DownloadPage } from '../pages/download/download';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SignInPage } from '../pages/account/sign-in/sign-in';
import { ProblemSuggestionPage } from '../pages/problem-suggestion/problem-suggestion';
import { ProfilePage } from '../pages/account/profile/profile';
import { InspectionListPage } from '../pages/inspection/inspection-list/inspection-list';
import { InspectionRegisterPage } from '../pages/inspection/inspection-register/inspection-register';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { BrandProvider } from '../providers/brand/brand';
import { PriceProvider } from '../providers/price/price';
import { ModelProvider } from '../providers/model/model';
import { YearFuelProvider } from '../providers/year-fuel/year-fuel';
import { CityProvider } from '../providers/city/city';
import { MediaCapture } from '@ionic-native/media-capture';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ApiProvider } from '../providers/api/api';
import { FileProvider } from '../providers/file/file';
import { SimulatorPage } from '../pages/simulator/simulator';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FeeProvider } from '../providers/fee/fee';
import { InspectionProvider } from '../providers/inspection/inspection';
import { InspectionConfirmPage } from '../pages/inspection/inspection-confirm/inspection-confirm';
import { ZipeCodeProvider } from '../providers/zip-code/zip-code';
import { S3Provider } from '../providers/s3/s3';
import { IonicSelectableModule } from 'ionic-selectable';
import { RedefinePasswordPage } from '../pages/account/redefine-password/redefine-password';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { IonicStorageModule } from '@ionic/storage';
import { IonMaskModule } from '@pluritech/ion-mask';
import { InspectionDocumentPage } from '../pages/inspection/inspection-document/inspection-document';
import { ErrorPage } from '../pages/error/error';
import { LottieAnimationViewModule } from 'ng-lottie';
import { InspectionErrorDocumentPage } from '../pages/inspection/inspection-error-document/inspection-error-document';
import { InspectionVideoPage } from '../pages/inspection/inspection-video/inspection-video';

registerLocaleData(localePt);

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDdpbmE01E55i_1u525TTzSkwLaSoMzWaM",
  authDomain: "futurepro-storage.firebaseapp.com",
  databaseURL: "https://futurepro-storage.firebaseio.com",
  projectId: "futurepro-storage",
  storageBucket: "futurepro-storage.appspot.com",
  messagingSenderId: "221936802366",
  appId: "1:221936802366:web:c23fa960c76b8a47"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    ProfilePage,
    RedefinePasswordPage,
    CreateAccountPage,
    ContactPage,
    BankSlipPage,
    DownloadPage,
    TutorialPage,
    ProblemSuggestionPage,
    InspectionListPage,
    InspectionRegisterPage,
    InspectionConfirmPage,
    InspectionDocumentPage,
    SimulatorPage,
    ErrorPage,
    InspectionErrorDocumentPage,
    InspectionVideoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonMaskModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'inspection.db',
      driverOrder: ['indexeddb', 'sqlite']
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireStorageModule,
    LottieAnimationViewModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    ProfilePage,
    RedefinePasswordPage,
    CreateAccountPage,
    ContactPage,
    BankSlipPage,
    DownloadPage,
    TutorialPage,
    ProblemSuggestionPage,
    InspectionListPage,
    InspectionRegisterPage,
    InspectionConfirmPage,
    InspectionDocumentPage,
    SimulatorPage,
    ErrorPage,
    InspectionErrorDocumentPage,
    InspectionVideoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: "pt-BR" },
    UserProvider,
    LoadingProvider,
    ToastProvider,
    AlertProvider,
    DataUtilsProvider,
    CallNumber,
    EmailComposer,
    Camera,
    MediaCapture,
    StreamingMedia,
    YoutubeVideoPlayer,
    File,
    BrandProvider,
    ModelProvider,
    YearFuelProvider,
    PriceProvider,
    PriceProvider,
    CityProvider,
    ApiProvider,
    FileProvider,
    FileOpener,
    FileTransfer,
    FeeProvider,
    InspectionProvider,
    ZipeCodeProvider,
    S3Provider
  ]
})
export class AppModule { }
