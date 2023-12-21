//Elemento del ORM que permitirá difinir los tipos de datos de las propiedades (columnas de la base de datos)
import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Property = db.define("tbb_property",
{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: 
    {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    description:
    {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nRooms:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    nParkinlots:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    nWc:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    address:{
        type:DataTypes.STRING(300),
        allowNull: false
        
    },
    lat:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    lng:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'por definir'
    },
    published:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
}
);

export default Property;
 