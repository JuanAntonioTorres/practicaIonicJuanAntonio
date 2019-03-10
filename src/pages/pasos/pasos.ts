import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TTSOptions } from '@ionic-native/text-to-speech';

/**
 * Generated class for the PasosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pasos',
  templateUrl: 'pasos.html',
})
export class PasosPage {

  opcionesParaLector:TTSOptions = { text: "", locale: 'es-ES', rate: 1 }

  constructor(public navCtrl: NavController, public navParams: NavParams, public steve: FachadaProvider) {
    this.steve.contarPasos().subscribe(data => {
      this.steve.pasos = data.numberOfSteps;
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad PasosPage');
    (async () => {
      this.steve.leer("contando pasos");
      await this.delay(1000);
      this.navCtrl.setRoot(HomePage);
    })();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
