import * as sqlite from "sqlite3"

const sqlite3 = sqlite.verbose()
const db = new sqlite3.Database("database.db")

export const dbTypes = {
    "Integer" : "INTEGER",
    "Text" : "TEXT",
    "String" : "CHAR(255)"
}
export const specialTypes = {
    "notNull" : "NOT NULL",
    "primaryKey": "PRIMARY KEY",
    "Unique" : "UNIQUE"
}
export const dbOperators = {
    AND : " AND '",
    OR : " OR '",
    NOT : " != '",
    LIKE : " LIKE '",
    EQUAL : " = '"
}
export class Model{
    setValues() : Object{return {}}
    table_name : string;

    constructor(name : string){
        this.table_name = name
    }

    async migrate(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.table_name}(`
        let data = this.setValues()
        for (const [key, value] of Object.entries(data)){
            query += `${key} `
            value.forEach((element : string) => {
                query += `${element} `
                if (value[value.length - 1] == element&&Object.keys(data).indexOf(key) != Object.keys(data).length -1){
                    query += ","
                }
            });
            
        }
        query += ");"
        await db.run(query)
    }

    async create(obj : Object){
        let keys = Object.keys(obj)
        let query = `INSERT INTO ${this.table_name}(`
        for (const k of keys){
            query += keys.indexOf(k) == keys.length - 1 ? k : k + ","
        }
        query += ") VALUES ("
        let values = Object.values(obj)
        values.forEach((element, i)=> {
            query += i == values.length - 1 ? `"${element}"` : `"${element}",`
        })
        query += ");"
        db.run(query)
    }
    getOne(obj : Object, callback : Function){
        let query = `SELECT * FROM ${this.table_name} WHERE `
        let keys : string[] = Object.keys(obj);
        let value : any;
        keys.forEach((key) => {
            //@ts-ignore
            value = obj[key]
            query += key + `${value}'`
        })
        query += ";"
        let data;
        data = db.get(query, callback)
        return data
    }

    getAll(obj : Object, callback : Function){
        let query = `SELECT * FROM ${this.table_name} WHERE `
        let keys : string[] = Object.keys(obj);
        let value : any;
        keys.forEach((key) => {
            //@ts-ignore
            value = obj[key]
            query += key + `${value}'`
        })
        query += ";"
        let data;
        console.log(query)
        data = db.all(query, callback)
        return data
    }
    
}