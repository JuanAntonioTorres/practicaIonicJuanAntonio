import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';

/*
  Generated class for the OrdenesDaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdenesDaoProvider {

  public sqlobj: SQLiteObject;
  private dataBaseName: string = 'ordenes.db';

  constructor(public sqlite: SQLite, public platform: Platform, public sqlcopy: SqliteDbCopy) {
    this.platform.ready().then(() => {
      this.deleting().then(() => {
        this.sqlite.create({
          name: 'ordenes.db',
          location: 'default',
          createFromLocation: 1
        }).then((db: SQLiteObject) => {
          this.sqlobj = db;
        }
        ).catch(e => console.error(e))
      })
    })
  }

  getOrdenes(): Promise<string[][]> {
    const sqlUser = "SELECT * FROM ordenes";
    return new Promise((resolve) => {
      let ordenes: any[] = [];
      this.executeSentence(ordenes, sqlUser, []).then((ordenes:any[]) => {
        let retorno:string[][] = [];
        for (let i = 0; i < ordenes.length; i++) {
          console.dir("ordenes cargadas "+i);
          retorno.push([ordenes[i].clave,ordenes[i].valor]);
        }
          resolve(retorno);
      }).catch(()=>{
        resolve(null)
      });
    })
  }

  guardarOrden(clave: string,valor:string): Promise<any> {
    const sqlUser = "INSERT INTO ordenes(clave,valor)VALUES ('"+clave+"','"+valor+"');";
    return new Promise((resolve)=>{
      this.executeSentence([], sqlUser, []).then(()=>{
        resolve();
      });
    })
  }


  openDataBase(name: string) {
    const conector = { name: name, location: 'default', createFromLocation: 1 };
    return (this.sqlite.create(conector));
  }

  executeSentence(target: any, sqlSentence: string, searchParam: any[]) {
    return new Promise((resolve, reject) => {
      this.openDataBase(this.dataBaseName).then((db: SQLiteObject) =>
        db.executeSql(sqlSentence, searchParam
        ).then((resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            let obj: any = resultSet.rows.item(i);
            target.push(obj);
            console.log(JSON.stringify(obj));
          } resolve(target);
        }).catch((e) => {
          console.log(e);
          reject(e);
        })).catch((e) => {
          console.log("Error al abrir DB"); reject(e);
        })
    })
  }

  deleting(): Promise<void> {
    //Al parecer puede que createFromLocation puede fallar a pesar de estar diseñada para
    //prepoluted asi que hacemos esto de copiarla
    console.info("haciendo deleting");
    return new Promise((resolve) => {
      this.sqlcopy.copy("ordenes.db", 0)
        .then(() => {
          console.log("exito");
          resolve();
        }).catch(()=>{
          console.log("deleting cagada");
        })
    })
  }

}
