import { OrdenesDaoProvider } from './../ordenes-dao/ordenes-dao';
import { DaoProvider } from './../dao/dao';
import { BateriaProvider } from './../bateria/bateria';
import { CameraProvider } from './../camera/camera';
import { ContactosProvider } from './../contactos/contactos';
import { IPedometerData } from '@ionic-native/pedometer';
import { PasosProvider } from './../pasos/pasos';
import { LinternaProvider } from './../linterna/linterna';
import { ListenerProvider } from './../listener/listener';
import { SpeackerProvider } from './../speacker/speacker';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TTSOptions } from '@ionic-native/text-to-speech';
import { Observable } from 'rxjs/Observable';
import { BatteryStatusResponse } from '@ionic-native/battery-status';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { escapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

/*
  Generated class for the FachadaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FachadaProvider {

  pasos = 0;
  opcionesParaLector: TTSOptions = { text: "", locale: 'es-ES', rate: 1 }
  opcionesParaListener = { language: "es-ES", matches: 1, showPartial: true }
  nombreUsuario = null;
  escuchador: any;

  constructor(public http: HttpClient, public speacker: SpeackerProvider,
    public listener: ListenerProvider, public linterna: LinternaProvider, public cuentaPasos: PasosProvider,
    public contacto: ContactosProvider, public camara: CameraProvider, public bateria: BateriaProvider,
    public guardadorFoto: Base64ToGallery, public permisos: AndroidPermissions,public dao:DaoProvider,
    public ordenesDao:OrdenesDaoProvider) {
    console.log('Hello FachadaProvider Provider');
  }

  mirarCuantaBateria(): Promise<any> {
    return new Promise((resolve) => {
      this.escuchador =this.bateria.checkBateria().subscribe((estado: BatteryStatusResponse) => {
        if(estado!=undefined){
          this.escuchador.unsubscribe();
          resolve(estado);
        }
      })
    })
  }

  obtenerOrdenes():Promise<string[][]>{
    return new Promise((resolve)=>{
      this.ordenesDao.getOrdenes().then((ordenes)=>{
        resolve(ordenes);
      })
    })
  }

  guardarOrden(clave:string,valor:string):Promise<void>{
    return new Promise((resolve)=>{
      this.ordenesDao.guardarOrden(clave,valor).then(()=>{
        resolve();
      })
    })
  }

  guardarEnDB(nombre): void {
    this.dao.guardarUsuario(nombre);
  }

  guardarEnDBNuevoNombre(nuevoNombre: string): any {
    this.dao.actulizarUsuario(nuevoNombre,this.nombreUsuario);
    this.nombreUsuario = nuevoNombre;
  }

  comprobarNombreUsuarioEnDB(): Promise<any> {
    return new Promise((resolve)=>{
      this.dao.getUsuario().then((nombre)=>{
        this.nombreUsuario = nombre;
        resolve();
      })
    })
  }


  leer(texto: string, idioma?: string): Promise<any> {
    idioma = idioma || 'es-ES';
    return new Promise((resolve, reject) => {
      this.opcionesParaLector.text = texto;
      this.opcionesParaLector.locale = idioma;
      this.speacker.leer(this.opcionesParaLector).then((res) => {
        console.log('texto leido esa promesa retornaba ' + res);
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  escuchar(idioma?: string): Observable<string[]> {
    idioma = idioma || 'es-ES';
    this.opcionesParaListener.language = idioma;
    return this.listener.escuchar(this.opcionesParaListener);
  }

  abrirCamara(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.camara.abrirCamara().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  cerrarCamara(): any {
    return new Promise((resolve, reject) => {
      this.camara.cerrarCamara().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  hacerFoto(opcion): Promise<string> {
    return new Promise((resolve, reject) => {
      this.camara.hacerFoto(opcion).then((imagen: string) => {
        resolve(imagen);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  guardarFoto(nombre: string, options: Base64ToGalleryOptions): Promise<any> {
    return new Promise((resolve) => {
      console.log(nombre);
      let todecode = atob(nombre);
      console.log(todecode);
      let foto = btoa(todecode);
      console.log(foto);

      this.comprobarPermiso(this.permisos.PERMISSION.READ_EXTERNAL_STORAGE).then(() => {
        this.comprobarPermiso(this.permisos.PERMISSION.WRITE_EXTERNAL_STORAGE).then(() => {
          this.guardadorFoto.base64ToGallery(foto, options).then((res) => {
            resolve(res);
          }).catch((err) => {
            console.log(err);
          })
        })
      })
    })
  }

  comprobarPermiso(permiso): Promise<any> {
    return new Promise((resolve) => {
      this.permisos.checkPermission(permiso).then((result) => {
        console.log('Has permission?', result.hasPermission);
        if (result.hasPermission === true) {
          resolve();
        } else {
          this.permisos.requestPermission(permiso).then(() => {
            resolve();
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  hacerFotoManual(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.camara.hacerFotoManual().then((imagen: string) => {
        resolve(imagen);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  /*
    buscarContacto(nombre):Promise<any>{
      return new Promise((resolve)=>{
        this.contacto.buscarContacto(nombre).then((contacto)=>{
          resolve(contacto);
        })
      })
    }
  */
  crearContacto(nombre: string, apellido: string, mobile: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.comprobarPermiso(this.permisos.PERMISSION.READ_CONTACTS).then(() => {
        this.comprobarPermiso(this.permisos.PERMISSION.WRITE_CONTACTS).then(() => {
          this.contacto.crearContacto(nombre, apellido, mobile).then(() => {
            resolve();
          }).catch((error) => {
            console.log(error);
            reject();
          })
        })
      })
    })

  }

  contarPasos(): Observable<IPedometerData> {
    return this.cuentaPasos.contarPasos();
  }

  isLinternaOn(): Promise<boolean> {
    return new Promise((resolve => {
      this.linterna.isOn().then((res: boolean) => {
        resolve(res);
      })
    }))
  }

  apagarLinterna() {
    return new Promise((resolve => {
      this.linterna.apagarLuz().then(() => {
        resolve();
      })
    }))
  }

  encenderLinterna() {
    return new Promise((resolve => {
      this.linterna.encenderLuz().then(() => {
        resolve();
      })
    }))
  }



  checkFeatureAvailable(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.listener.checkFeatureAvailable().then((res) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  startRecognitionProcess(options) {
    this.listener.startRecognitionProcess(options)
  }

  getSupportedLanguages(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.listener.getSupportedLanguages().then((res: Array<string>) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  checkPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.listener.checkPermission().then((res: boolean) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  askPermissionToUseMicrophone(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.listener.requestPermissions().then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    })
  }

}
