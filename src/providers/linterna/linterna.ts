import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight';

/*
  Generated class for the LinternaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LinternaProvider {

  constructor(public http: HttpClient,public linterna:Flashlight) {
    console.log('Hello LinternaProvider Provider');
  }

  encenderLuz(){
    return new Promise((resolve)=>{
      this.linterna.switchOn().then((res)=>{
        resolve(res);
      })
    })
  }

  apagarLuz(){
    return new Promise((resolve)=>{
      this.linterna.switchOff().then((res)=>{
        resolve(res);
      })
    })
  }

  isOn(){
    return new Promise((resolve)=>{
      resolve(this.linterna.isSwitchedOn());
    })
  }



}
