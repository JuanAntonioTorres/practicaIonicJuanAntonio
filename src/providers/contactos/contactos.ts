import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactName, ContactField, Contact } from '@ionic-native/contacts';
/*
  Generated class for the ContactosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactosProvider {

  constructor(public http: HttpClient, public contactos: Contact) {
    console.log('Hello ContactosProvider Provider');
  }

  crearContacto(nombre: string, apellido: string, mobile: string): Promise<any> {
    this.contactos = new Contact();
    return new Promise((resolve, reject) => {
      this.crearDatos(nombre, apellido, mobile).then((contactos:Contact) => {
        contactos.save().then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        })
      })
    })
  }

  crearDatos(nombre: string, apellido: string, mobile: string): Promise<any> {
    return new Promise((resove) => {
      console.log(nombre);
      console.log(this.contactos);
      this.contactos.name = new ContactName(null,apellido,nombre);
      this.contactos.phoneNumbers = [new ContactField('mobile', mobile)];
      resove(this.contactos);
    })
  }

  buscarContacto(nombre): Promise<any> {
    return new Promise((resolve) => {
      this.contactos.ims.forEach(IContactField => {
        console.dir(IContactField);
        if (IContactField["name"] === nombre) {
          resolve(IContactField);
        }
      })
    })
  }
}
