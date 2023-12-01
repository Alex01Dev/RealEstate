import { DataTypes } from "sequelize";
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const User = db.define("tbb_users", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        unique: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ultimo_login: {
        type: DataTypes.DATE // Agrega la columna para almacenar la fecha del último inicio de sesión
    }
},{
    hooks: {
        beforeCreate: async(User) => {
            const salt = await bcrypt.genSalt(10);//entre mas alto sea el numero mas sera dificl hackearlo pero consume mas memoria
            User.password = await bcrypt.hash(User.password, salt);
        }
    }
});


//comparamos el password de la variable con el password de la base de datos
User.prototype.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password);//comparar el hasheo
}

export default User;
