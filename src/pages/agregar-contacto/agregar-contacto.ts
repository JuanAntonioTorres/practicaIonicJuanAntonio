import { HomePage } from './../home/home';
import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TTSOptions } from '@ionic-native/text-to-speech';

/**
 * Generated class for the AgregarContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-contacto',
  templateUrl: 'agregar-contacto.html',
})
export class AgregarContactoPage {

  opcionesParaLector: TTSOptions = { text: "", locale: 'es-ES', rate: 1 }

  opcionesParaListener = { language: "es-ES", matches: 1, showPartial: true }
  nombre: string;
  listener: any;
  apellido: string;
  numero: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public steve: FachadaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarContactoPage');
    this.escucharNombre();
  }

  escucharNombre(): void {
    this.steve.leer("Dime el nombre").then(() => {
      this.listener = this.steve.escuchar().subscribe((datos) => {
        this.nombre = datos.toString();
        if (datos != undefined) {
          this.listener.unsubscribe();
          this.steve.leer("es correcto " + this.nombre+", si o no").then(() => {
            this.escucharSIoNO().then((respuesta) => {
              if (respuesta.toLocaleLowerCase() == "si" || respuesta.toLocaleLowerCase() == "sí") {
                this.escucharApellido();
              }
              else {
                this.escucharNombre();
              }
            })
          })
        }

      })
    })
  }


  escucharApellido(): any {
    this.steve.leer("Dime el apellido").then(() => {
      this.listener = this.steve.escuchar().subscribe((datos) => {
        this.apellido = datos.toString();
        if (datos != undefined) {
          this.listener.unsubscribe();
          this.steve.leer("es correcto? " + this.apellido+" ,si o no").then(() => {
            this.escucharSIoNO().then((respuesta) => {
              if (respuesta.toLocaleLowerCase() == "si" || respuesta.toLocaleLowerCase() == "sí") {
                this.escucharNumero();
              }
              else {
                this.escucharApellido();
              }
            })
          })
        }
      })


    })
  }


  escucharNumero(): any {
    this.steve.leer("Dime el número").then(() => {
      this.listener = this.steve.escuchar().subscribe((datos) => {
        this.numero = datos.toString();
        if (datos != undefined) {
          this.listener.unsubscribe();
          this.steve.leer("es correcto? " + this.numero+", si o no").then(() => {
            this.escucharSIoNO().then((respuesta) => {
              if (respuesta.toLocaleLowerCase() == "si" || respuesta.toLocaleLowerCase() == "sí") {
                this.guardarNumero();
              }
              else {
                this.escucharNumero();
              }
            })
          })
        }
      })

    })
  }
  guardarNumero(): any {
    this.steve.crearContacto(this.nombre, this.apellido, this.numero).then(() => {
      this.steve.leer("Contacto agregado").then(() => {
        this.navCtrl.setRoot(HomePage);
      })
    }).catch(()=>{
      this.steve.leer("No he podido agregarlo").then(() => {
        this.navCtrl.setRoot(HomePage);
      })
    })
  }



  escucharSIoNO(): Promise<string> {
    return new Promise((resolve) => {
      this.listener = this.steve.escuchar().subscribe((datos) => {
        let respuesta = datos.toString();
        if (respuesta != null) {
          this.listener.unsubscribe();
          resolve(respuesta);
        }
      })
    })
  }

}
