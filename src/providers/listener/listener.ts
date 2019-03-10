import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ListenerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListenerProvider {

  constructor(public http: HttpClient, public speechRecognition: SpeechRecognition) {
    console.log('Hello ListenerProvider Provider');
  }

  escuchar(option):Observable<string[]> {
    return this.speechRecognition.startListening(option);
  }

  checkFeatureAvailable(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.speechRecognition.isRecognitionAvailable().then((res) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  startRecognitionProcess(options) {
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: Array<string>) => console.log(matches),
        (onerror) => console.log('error:', onerror)
      )
  }

  //  stopRecognitionProcess (iOS only){
  //  SpeechRecognition.stopListening()
  //}

  getSupportedLanguages(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.speechRecognition.getSupportedLanguages().then((res: Array<string>) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  checkPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.speechRecognition.hasPermission().then((res: boolean) => {
        resolve(res);
      }).catch((fail) => {
        reject(fail);
      })
    })
  }

  requestPermissions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.speechRecognition.requestPermission().then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    })
  }

}
