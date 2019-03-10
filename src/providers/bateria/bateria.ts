import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the BateriaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BateriaProvider {

  constructor(public http: HttpClient,public bateria:BatteryStatus){
    console.log('Hello BateriaProvider Provider');
  }
  
  checkBateria():Observable<BatteryStatusResponse>{
    return this.bateria.onChange();
  }
  

}
