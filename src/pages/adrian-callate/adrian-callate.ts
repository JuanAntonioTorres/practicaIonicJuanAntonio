import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdrianCallatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adrian-callate',
  templateUrl: 'adrian-callate.html',
})
export class AdrianCallatePage {
  constructor(public navCtrl: NavController, public steveProvider: FachadaProvider) {
  }

  ionViewDidLoad() {
    (async () => {
      console.log('ionViewDidLoad AdrianCallatePage');
      this.steveProvider.leer("ADRIÁN CÁLLATE. Por Favor")
      await delay(3000);
      this.navCtrl.setRoot(HomePage);
    })();
    async function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  }

}
