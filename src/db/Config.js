import mysql from 'mysql2'

const dbPool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'user.100',
    database: 'rest-api',
    multipleStatements: true
})

if (dbPool) console.log('Connected to database')

export default dbPool.promise();