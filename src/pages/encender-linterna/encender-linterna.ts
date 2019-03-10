import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TTSOptions } from '@ionic-native/text-to-speech';

/**
 * Generated class for the EncenderLinternaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encender-linterna',
  templateUrl: 'encender-linterna.html',
})
export class EncenderLinternaPage {
  opcionesParaLector: TTSOptions = { text: "", locale: 'es-ES', rate: 1 }

  constructor(public navCtrl: NavController, public navParams: NavParams, public steveProvider: FachadaProvider) {
  }

  ionViewDidLoad() {
    if(String(this.navParams.get("claveOpcion")).includes("enc")){
      this.steveProvider.encenderLinterna();
    }
    else this.steveProvider.apagarLinterna();
    this.navCtrl.setRoot(HomePage);
  }

}
