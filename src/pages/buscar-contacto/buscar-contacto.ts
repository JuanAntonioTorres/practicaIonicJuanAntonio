import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuscarContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-contacto',
  templateUrl: 'buscar-contacto.html',
})
export class BuscarContactoPage {

  nombre:string;
  apellido:string;
  numero:string;
  listener:any;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarContactoPage');
    //this.buscarContacto();
  }
  /*
  buscarContacto(): any {
    this.steve.leer("dime el nombre ").then(()=>{
      this.listener = this.steve.escuchar().subscribe((nombre)=>{
        this.steve.buscarContacto(nombre).then((contacto)=>{
          console.dir(contacto);
          this.nombre = contacto["name"];
          this.apellido = contacto["nick"];
          this.numero = contacto["number"];
          this.steve.leer("contacto encontrado nombre:" + this.nombre + " apellido " + this.apellido + " numero " + this.numero ).then(()=>{
            this.navCtrl.setRoot(HomePage);
          }).catch(()=>{
            this.steve.leer("llo siento, no lo encuentro").then(()=>{
              this.navCtrl.setRoot(HomePage);
            })
          })
        })
      })
    })
  }
*/
}
