import { PasosPage } from './../pages/pasos/pasos';
import { ConsultarBateriaPage } from './../pages/consultar-bateria/consultar-bateria';
import { FachadaProvider } from './../providers/fachada/fachada';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormsModule } from '@angular/forms';
import { ContactosProvider } from '../providers/contactos/contactos';
import { SpeackerProvider } from '../providers/speacker/speacker';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Flashlight } from '@ionic-native/flashlight';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ListenerProvider } from '../providers/listener/listener';
import { AdrianCallatePage } from '../pages/adrian-callate/adrian-callate';
import { AgregarContactoPage } from '../pages/agregar-contacto/agregar-contacto';
import { EncenderLinternaPage } from '../pages/encender-linterna/encender-linterna';
import { LinternaProvider } from '../providers/linterna/linterna';
import { PasosProvider } from '../providers/pasos/pasos';
import {Pedometer} from '@ionic-native/pedometer';
import {Contact} from '@ionic-native/contacts';
import {Camera} from '@ionic-native/camera';
import {BatteryStatus} from '@ionic-native/battery-status';
import {SpeechKit} from '@ionic-native/speechkit';
import {Autostart} from '@ionic-native/autostart';
import {AndroidPermissions} from '@ionic-native/android-permissions';
import { CameraProvider } from '../providers/camera/camera';
import { FotoPage } from '../pages/foto/foto';
import { BateriaProvider } from '../providers/bateria/bateria';
import {CameraPreview} from '@ionic-native/camera-preview';
import {SQLite} from '@ionic-native/sqlite';
import {SqliteDbCopy} from '@ionic-native/sqlite-db-copy';
import { DaoProvider } from '../providers/dao/dao';
import { OrdenesDaoProvider } from '../providers/ordenes-dao/ordenes-dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdrianCallatePage,
    AgregarContactoPage,
    EncenderLinternaPage,
    ConsultarBateriaPage,
    PasosPage,
    FotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FachadaProvider,
    LinternaProvider,Flashlight,
    ContactosProvider,Contact,
    SpeackerProvider,TextToSpeech,SpeechKit,
    SpeechRecognition,ListenerProvider,
    Pedometer,PasosProvider,
    AndroidPermissions,
    CameraPreview,CameraProvider,Camera,
    BatteryStatus,BateriaProvider,
    Autostart,Base64ToGallery,
    SQLite,DaoProvider,SqliteDbCopy,
    OrdenesDaoProvider
  ]
})
export class AppModule {}
