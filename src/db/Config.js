import { Sequelize } from "sequelize";

const db = new Sequelize('rest-api', 'root', 'user.100', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db
