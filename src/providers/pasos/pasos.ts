import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PasosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PasosProvider {

  contarPasos(): Observable<IPedometerData> {
   return this.pedometer.startPedometerUpdates();
  }

  constructor(public http: HttpClient,public pedometer:Pedometer) {
    console.log('Hello PasosProvider Provider');
  }

  

}
