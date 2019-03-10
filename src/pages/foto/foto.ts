import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';

/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {
  base64Image: string;

  constructor(public navCtrl: NavController,public navParam:NavParams, public steve: FachadaProvider) {
  }

  ionViewDidLoad() {

    this.steve.abrirCamara().then((res) => {
      this.steve.leer("Di patata").then((res) => {
        this.steve.escuchar().subscribe(patata => {
          this.comprobarPatata(patata.toString()).then((patata) => {
            if (patata === true) {
              this.steve.leer("sonrie");
              this.steve.hacerFoto(this.navParam.get("claveOpcion")).then((foto) => {
                this.base64Image = 'data:image/jpeg;base64,' +foto;
                this.steve.cerrarCamara();
                this.steve.leer("que feo has salido. Quieres guardar la foto?").then(() => {
                  this.steve.escuchar().subscribe(si => {
                    if (si.toString() == "sí") {
                      this.steve.leer("elige un nombre").then(() => {
                        this.steve.escuchar().subscribe(nombre=>{
                          this.steve.leer("estoy guardando la foto, dame un segundo");
                          this.steve.guardarFoto(foto,{ prefix: nombre.toString(),mediaScanner: true}).then(()=>{
                            this.steve.leer("foto guardada").then(()=>{
                              this.navCtrl.setRoot(HomePage);
                            })
                          })
                        })
                      })
                    }
                    else {
                      this.steve.leer("muy bien, si yo fuera tú, tampoco la hubiera guardado").then(()=>{
                        this.navCtrl.setRoot(HomePage);
                      })
                    }
                  })
                })
              })
            }
            else {
              this.steve.leer("no has dicho patata").then(() => {
                this.navCtrl.setRoot(HomePage);
              })
            }
          })
        })
      })
    })
    /*
    console.log('ionViewDidLoad FotoPage');
    this.steve.hacerFoto().then((imagen:string)=>{
      this.base64Image = imagen;
      (async () => {
        await this.delay(8000);
        this.steve.leer("ánimo, podría ser peor");
        this.navCtrl.setRoot(HomePage);
      })();
    })
    */
  }

  comprobarPatata(patata: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(patata.toString().toLocaleLowerCase() == "patata");
    })
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



}
