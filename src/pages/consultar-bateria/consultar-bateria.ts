import { BatteryStatusResponse } from '@ionic-native/battery-status';
import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConsultarBateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-bateria',
  templateUrl: 'consultar-bateria.html',
})
export class ConsultarBateriaPage {
  estadoLevel: number;

  constructor(public navCtrl: NavController, public steve:FachadaProvider) {
    
  }

  ionViewDidLoad() {
    this.steve.mirarCuantaBateria().then((estado:BatteryStatusResponse)=>{
      this.estadoLevel = estado.level;
      this.steve.leer("Te queda el " + estado.level+ "por ciento").then(()=>{
        (async () => {
          await this.delay(2000);
          this.navCtrl.setRoot(HomePage);
        })();
      })
    })
  }
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
