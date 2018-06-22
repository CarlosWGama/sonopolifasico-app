import { Injectable } from '@angular/core';
import { MyProvider } from './MyProvider';
import { Cycle } from '../../models/Cycle';
import { SQLiteObject } from '@ionic-native/sqlite';

/**
* @author Carlos W. Gama
* @since 1.0.0
*/
@Injectable()
export class CycleProvider extends MyProvider {

    /**
     * Cadastra um novo ciclo
     * @param c Ciclo
     */
    public create(c: Cycle): void {
      this.getDB().then((db: SQLiteObject) => {
        db.executeSql("INSERT INTO cycles(start_hour, start_minute, finish_hour, finish_minute) VALUES(?, ?, ?, ?)", 
                [c.startHour, c.startMinute, c.finishHour, c.finishMinute]);
        //db.close();
      });
    }

    /**
     * Retorna os ciclos cadastrados
     */
    public getAll(): Promise<Cycle[]> {
      return this.getDB().then((db: SQLiteObject) => {
        
        let datas: Promise<Cycle[]> = db.executeSql("SELECT * FROM cycles ORDER BY start_hour", {}).then(data => {  
          let cycles: Cycle[] = [];
          
          //Encontrou resultados
          if (data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                let r = data.rows.item(i);
                cycles.push(new Cycle(r.start_hour,r.start_minute, r.finish_hour, r.finish_minute, r.id));
              }
            }
          
          return cycles;
        });
        return datas;
      });
    }

    /**
     * Deleta um Ciclo existente
     * @param id 
     */
    public delete(id: number): void {
      this.getDB().then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM cycles WHERE id = ? ", [id]);
      });
    }

    /**
     * Deleta todos os dados da tabela para criar um novo
     */
    public deleteAll() {
      this.getDB().then((db: SQLiteObject) => {
        db.executeSql("DELETE FROM cycles", []);
      });
    }
}
