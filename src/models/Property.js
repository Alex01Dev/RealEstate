import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Property = db.define('tbb_properties', {
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
   },
   title: {
     type: DataTypes.STRING(100),
     allowNull: false
   }, 
   description: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   bedrooms: {
    type: DataTypes.INTEGER,
    allowNull:false
   },
   parking_lot: {
    type: DataTypes.INTEGER,
    allowNull:false
   },
   wc: {
    type: DataTypes.INTEGER,
    allowNull:false
   },
   Street: {
    type: DataTypes.STRING(60),
    allowNull:false
   },
   lat: {
    type: DataTypes.STRING,
    allowNull:false

   },
   lng: {
    type: DataTypes.STRING,
    allowNull:false
   },
   image: {
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue: 'por definir'

   },
   published: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   }
});

export default Property;
