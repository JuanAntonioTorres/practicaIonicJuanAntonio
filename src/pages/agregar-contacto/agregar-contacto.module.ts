import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarContactoPage } from './agregar-contacto';

@NgModule({
  declarations: [
    AgregarContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarContactoPage),
  ],
})
export class AgregarContactoPageModule {}
