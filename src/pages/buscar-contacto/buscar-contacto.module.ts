import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarContactoPage } from './buscar-contacto';

@NgModule({
  declarations: [
    BuscarContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarContactoPage),
  ],
})
export class BuscarContactoPageModule {}
