import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';

/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {
 
  public sqlobj: SQLiteObject;
  private dataBaseName: string = 'user.db';

  constructor(public sqlite: SQLite, public platform: Platform, public sqlcopy: SqliteDbCopy) {
    this.platform.ready().then(() => {
      this.deleting().then(() => {
        this.sqlite.create({
          name: 'user.db',
          location: 'default',
          createFromLocation: 1
        }).then((db: SQLiteObject) => {
          this.sqlobj = db;
        }
        ).catch(e => console.error(e))
      })
    })
  }

  actulizarUsuario(nuevoNombre: string,nombreAnterior:string): any {
    const sqlUser = "UPDATE user SET name = '"+nuevoNombre+"' WHERE user.name = '"+nombreAnterior+"';";
    let userName: any[] = [];
    this.executeSentence(userName, sqlUser, []);
  }

  getUsuario(): Promise<string|null> {
    const sqlUser = "SELECT user.name FROM user";
    return new Promise((resolve) => {
      let userName: any[] = [];
      this.executeSentence(userName, sqlUser, []).then((userName) => {
        console.log(userName);
        if(userName[0]!=undefined){
          resolve(userName[0].name);
        }
        else resolve(null);
      }).catch(()=>{
        resolve(null)
      });
    })
  }

  guardarUsuario(nombre: string): any {
    const sqlUser = "INSERT INTO user(name)VALUES ('"+nombre+"');";
      let userName: any[] = [];
      this.executeSentence(userName, sqlUser, []);
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
      this.sqlcopy.copy("user.db", 0)
        .then(() => {
          console.log("exito");
          resolve();
        }).catch(()=>{
          console.log("deleting cagada");
        })
    })
  }
}
