import { FachadaProvider } from './../../providers/fachada/fachada';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ordenes: string[][];

  //llamadaSteve: string;
  //llamado: boolean;
  opcionSteve: string;
  opcionReconocida: string = "";


  listenerReady = false;
  listener: any;
  claveOpcion: any;
  opcionNoReconocida: string;
  posibleOpcionAprendida = false;

  constructor(public navCtrl: NavController, public steveProvider: FachadaProvider, public platform: Platform) {

  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.steveProvider.obtenerOrdenes().then((ordenes) => {
        this.ordenes = ordenes;
        this.steveProvider.askPermissionToUseMicrophone().then(() => {
          if (this.steveProvider.nombreUsuario == null) {
            this.steveProvider.comprobarNombreUsuarioEnDB().then(() => {
              if (this.steveProvider.nombreUsuario == null) {
                this.steveProvider.leer("Hola, no te conozco.¿Cómo te llamas?").then(() => {
                  this.steveProvider.escuchar().subscribe(nombreSteve => {
                    this.steveProvider.nombreUsuario = nombreSteve.toString();
                    this.steveProvider.guardarEnDB(nombreSteve.toString());
                    this.escucharOpcion();
                  })
                })
              } else this.escucharOpcion();
            })
          } else this.escucharOpcion();
        })
      })
    })
  }

  /* esto es por si consigo escuchar con el telefono boqueado
  private escucharLlamada(): void {
    this.listener = this.steveProvider.escuchar("en-GB").subscribe((llamadaTexto) => {
      this.llamadaSteve = llamadaTexto.toString();
      this.isLlamadaSteve(llamadaTexto.toString()).then((llamado) => {
        if (llamado) {
          this.listener.unsubscribe();
          this.comprobarSiConocido().then((conocido) => {
            this.steveProvider.leer("Que quieres hacer " + this.steveProvider.nombreUsuario).then(() => {
              this.escucharOpcion();
            })
          });
        }
        else {
          this.escucharLlamada();
        }
      });
    });

  }
*/
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  escucharOpcion(): void {
    this.steveProvider.leer("¿qué quieres hacer?").then(() => {
      this.listener = this.steveProvider.escuchar().subscribe((opcionesTexto) => {
        this.opcionSteve = opcionesTexto.toString();
        this.isOpcionReconocida(opcionesTexto.toString()).then(() => {
          this.comprobarSiAprenderOrden().then(() => {
            this.posibleOpcionAprendida = false;
            if (this.opcionReconocida == "gracias") {
              this.steveProvider.leer("De nada").then(() => {
                this.escucharOpcion();
              })
            }
            else if (this.opcionReconocida == "cambiarNombre") {
              this.steveProvider.leer("dime tu nuevo nombre").then(() => {
                this.steveProvider.escuchar().subscribe(nuevoNombre => {
                  this.steveProvider.guardarEnDBNuevoNombre(nuevoNombre.toString());
                  this.steveProvider.leer("nombre actualizado").then(() => {
                    this.escucharOpcion();
                  })
                })
              })
            }
            else if (this.opcionReconocida == "NumeroDePasos") {
              this.steveProvider.leer(this.steveProvider.pasos + " pasos").then(() => {
                this.escucharOpcion();
              })
            }
            else {
              this.listener.unsubscribe();
              this.steveProvider.leer("okey " + this.steveProvider.nombreUsuario).then(() => {
                this.navCtrl.setRoot(this.opcionReconocida, { "claveOpcion": this.claveOpcion });
              })
            }
          })
        }).catch(() => {
          this.listener.unsubscribe();
          this.steveProvider.leer("¿que has querido decir?").then(() => {
            this.opcionNoReconocida = opcionesTexto.toString();
            this.posibleOpcionAprendida = true;
            this.escucharOpcion();
          });
        });
      });
    })
  }

  comprobarSiAprenderOrden(): Promise<any> {
    return new Promise((resolve) => {
      if (this.posibleOpcionAprendida === true) {
        this.steveProvider.leer("¿quieres que aprenda también la orden anterior?").then(() => {
          this.steveProvider.escuchar().subscribe(respuesta => {
            if (respuesta.toString() == "sí") {
              this.steveProvider.guardarOrden(this.opcionReconocida, this.opcionNoReconocida).then(() => {
                this.steveProvider.obtenerOrdenes().then((ordenes) => {
                  this.ordenes = ordenes;
                  this.steveProvider.leer("no problemo, aprendido para la próxima").then(() => {
                    resolve();
                  })
                })
              })
            }
            else {
              this.steveProvider.leer("okey, pues no lo aprendo").then(() => {
                resolve();
              })
            }
          })
        })
      }
      else {
        resolve();
      }
    })

  }
  comprobarSiConocido(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.steveProvider.nombreUsuario != "") {
        resolve(true);
      }
      else {
        this.steveProvider.leer("Hola, no te conozco dime tu nombre").then(() => {
          this.listener = this.steveProvider.escuchar().subscribe((nombre) => {
            this.steveProvider.nombreUsuario = nombre.toString();
            resolve(false);
          });
        })

      }
    })
  }
  /*esto tambien
    isLlamadaSteve(datosLlamada: string): Promise<boolean> {
      return new Promise((resolve) => {
        if (datosLlamada.toLowerCase() == "steve") {
          this.llamado = true;
        }
        resolve(true);
      })
    }
  */
  isOpcionReconocida(opcionActual: string): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("buscando la opcion en " + this.ordenes)
      for (let i = 0; i < this.ordenes.length; i++) {
        console.log("la opcion con la que comparo es " + opcionActual + "con " + this.ordenes[i][1]);
        if (opcionActual.toLowerCase().includes(this.ordenes[i][1].toLowerCase())) {
          console.log("opcion encontrada ")
          this.opcionReconocida = this.ordenes[i][0];
          this.claveOpcion = this.ordenes[i][1];
          resolve();
        }
      }
      reject();
    })
  }
}


/* this.permisos.checkPermission(this.permisos.PERMISSION.WRITE_CONTACTS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.permisos.requestPermissions(this.permisos.PERMISSION.WRITE_CONTACTS)
    );
    this.permisos.checkPermission(this.permisos.PERMISSION.READ_CONTACTS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.permisos.requestPermissions(this.permisos.PERMISSION.READ_CONTACTS)
    );
    this.permisos.checkPermission(this.permisos.PERMISSION.RECORD_AUDIO).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.permisos.requestPermissions(this.permisos.PERMISSION.RECORD_AUDIO)
    );
    this.permisos.checkPermission(this.permisos.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.permisos.requestPermissions(this.permisos.PERMISSION.CAMERA)
    );*/