import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

/**
* @author Carlos W. Gama
* @since 1.0.0
*/
@Injectable()
export abstract class MyProvider {
    
    constructor(private sqlite: SQLite) {
        this.createDatabase();
    }

    protected getDB(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: 'sleepcycle_cwg.db',
            location: 'default'
        });
    }

    protected createDatabase() {
        this.getDB().then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS cycles (\
                id INTEGER PRIMARY KEY AUTOINCREMENT,\
                start_hour INTEGER,\
                start_minute INTEGER,\
                finish_hour INTEGER,\
                finish_minute INTEGER)', {});
        }).catch(e => console.error(e));
    }
}