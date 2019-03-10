import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarBateriaPage } from './consultar-bateria';

@NgModule({
  declarations: [
    ConsultarBateriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarBateriaPage),
  ],
})
export class ConsultarBateriaPageModule {}
