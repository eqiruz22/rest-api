import { Sequelize } from "sequelize";
import db from '../db/Config.js'

const { DataTypes } = Sequelize

const User = db.define('user', {
    email: {
        type: DataTypes.STRING,
        field: 'email',
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        field: 'username',
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        field: 'password'
    },
    role: {
        type: DataTypes.STRING,
        field: 'role'
    }
}, {
    freezeTableName: true,
})
export default User;
(async () => {
    await db.sync()
})()