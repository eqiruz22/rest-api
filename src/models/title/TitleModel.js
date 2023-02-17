import dbPool from '../../db/Config.js'

const SelectTitle = (search, offset, limit) => {
    const sql = `SELECT id,title_name,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent 
                FROM title WHERE title_name LIKE '%${search}%' ORDER BY id LIMIT ${offset},${limit}`
    const query = dbPool.execute(sql)
    return query
}

const InsertTitle = (title, rent, meal, hardship, pulsa, car) => {
    const sql = `INSERT INTO title 
                (title_name,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent) 
                VALUES ('${title}','${rent}','${meal}','${hardship}','${pulsa}','${car}')`
    const query = dbPool.execute(sql)
    return query
}

const SelectById = (id) => {
    const sql = `SELECT title_name,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent FROM title WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const Update = (title, rent, meal, hardship, pulsa, car, id) => {
    const sql = `UPDATE title SET 
                title_name='${title}',
                rent_house='${rent}',
                meal_allowance='${meal}',
                hardship_allowance='${hardship}',
                pulsa_allowance='${pulsa}',
                car_rent='${car}' WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const CountTitle = (search) => {
    const sql = `SELECT COUNT(title_name) AS title FROM title WHERE title_name LIKE '%${search}%'`
    const query = dbPool.execute(sql)
    return query
}

const Delete = (id) => {
    const sql = `DELETE FROM title WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const SelectTitleName = () => {
    const sql = `SELECT id,title_name FROM title`
    const query = dbPool.execute(sql)
    return query
}

export default {
    SelectTitle,
    InsertTitle,
    SelectById,
    CountTitle,
    Update,
    Delete,
    SelectTitleName
}