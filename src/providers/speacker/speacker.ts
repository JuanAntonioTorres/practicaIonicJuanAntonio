import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';

/*
  Generated class for the SpeackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeackerProvider {

  constructor(public http: HttpClient, public speacker: TextToSpeech) {
    console.log('Hello SpeackerProvider Provider');
  }

  leer(texto: TTSOptions): Promise<any> {
    return new Promise((resolve,reject)=>{
      this.speacker.speak(texto).then((res)=>{
        resolve(res);
      }).catch((fail)=>{
        reject(fail);
      })
    })
  }

}
