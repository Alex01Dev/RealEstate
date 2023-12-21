import { exit } from 'node:process'
import Category from '../../models/Category.js'
import Price from '../../models/Price.js'
import User from '../../models/User.js'
import categories from "./categories.js";
import prices from './prices.js'
import users from './users.js'
import db from '../../config/db.js'


 const importData= async() => {
    try {
        //Autenticar 
        await db.authenticate();

        //Generar las columnas
        await db.sync();

        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users) 
        ])
        await db.query("alter table tbc_categories auto_increment=1"),
        await db.query("alter table tbc_prices auto_increment=1"),
        await db.query("alter table tbb_users auto_increment=1")
        
        console.log("Datos importados con éxito")
        exit()
    } catch (error) {
        console.log(error)
        //Corta el proceso
        exit(1)
    }
 }
 const deleteData= async() => {
    try {
        await Promise.all([
            Category.destroy({where: {}, truncate: false}),
            db.query("alter table tbc_categories auto_increment=1"),
            Price.destroy({where: {}, truncate: false}), 
            db.query("alter table tbc_prices auto_increment=1"),
            User.destroy({where: {}, truncate: false}),
            db.query("alter table tbb_users auto_increment=1")
        ])
        console.log("Datos eliminados con éxito")
        exit()
    } catch (error) {
        console.log(error)
        //Corta el proceso
        exit(1)
    }
 }



 if(process.argv[2] === "-i"){
    importData();
 }


 if(process.argv[2] === "-d"){
    deleteData();
 }