import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/**
* @author Carlos W. Gama
* @version 1.0.1
* @since 1.0.0
*/
@Injectable()
export abstract class MyProvider {
    
    /** Salvar a versão atual do banco */
    private readonly VERSION:number = 1;

    constructor(private sqlite: SQLite) {
        this.createDatabase();
    }

    protected getDB(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: 'sleepcycle1_cwg.db',
            location: 'default'
        });
    }

    protected createDatabase() {
        this.getDB().then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS version_db (version INTEGER)', {});
            
            db.executeSql('CREATE TABLE IF NOT EXISTS cycles (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                start_hour INTEGER,\
                start_minute INTEGER,\
                finish_hour INTEGER,\
                finish_minute INTEGER,\
                notification INTEGER DEFAULT 0)', {});

            //Aplica atualizações futuras
            db.executeSql("SELECT version FROM version_db", {}).then((data) => {

                if (data.rows.lenght > 0) {
                    let oldVersion: number = data.rows.item(0).version;
                    
                    switch(oldVersion) {
                        case 1: break;
                    }

                    db.executeSql("DELETE FROM version_db", {});
                }
            });

            db.executeSql("INSERT INTO version_db VALUES(?)", [this.VERSION]);
        }).catch(e => console.error(e));


    }
}