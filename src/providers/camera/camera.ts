import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: 222,
    height: 222,
    camera: 'rear',
    tapPhoto: false,
    previewDrag: false,
    toBack: false,
    alpha: 1,
  };
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  constructor(public http: HttpClient, public camera: Camera,
    public camaraPreview: CameraPreview, public permisos: AndroidPermissions) {
    console.log('Hello CameraProvider Provider');
  }
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  hacerFoto(opcion): Promise<string> {
    return new Promise((resolve, reject) => {
      if(opcion=="foto"){
        this.cameraPreviewOpts.camera = "rear";
      }else{
        this.cameraPreviewOpts.camera = "front";
      }
      this.camaraPreview.stopCamera().then(()=>{
        this.camaraPreview.startCamera(this.cameraPreviewOpts).then(()=>{
          (async () => {
            await this.delay(2000);
            this.camaraPreview.takePicture(this.pictureOpts).then((foto) => {
            let base64Image =  foto;
            resolve(base64Image);
            })
          })();
        })
        
      })
      
    })
  }


  abrirCamara() {
    return new Promise((resolve, reject) => {
      this.comprobarPermisoCamara().then(() => {
        this.camaraPreview.startCamera(this.cameraPreviewOpts).then((res) => {
          console.log(res);
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
      })
    })
  }

  cerrarCamara(): any {
    return new Promise((resolve, reject) => {
        this.camaraPreview.stopCamera().then((res) => {
          console.log(res);
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  comprobarPermisoCamara(): Promise<any> {
    return new Promise((resolve) => {
      this.permisos.checkPermission(this.permisos.PERMISSION.CAMERA).then((result) => {
        console.log('Has permission?', result.hasPermission);
        if (result.hasPermission === true) {
          resolve();
        } else {
          this.permisos.requestPermission(this.permisos.PERMISSION.CAMERA).then(() => {
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

  hacerFotoManual() {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        resolve(base64Image);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

}
