import dbPool from '../../db/Config.js'

const InsertZone = (zone, title, transport, airplane, hotel, meal, allowance) => {
    const sql = `INSERT INTO zone (zone_name,title_id,transport_non_airplane,transport_airplane,hotel,meal_allowance,allowance)
                 VALUES (?,?,?,?,?,?,?)`
    const value = [zone, title, transport, airplane, hotel, meal, allowance]
    const query = dbPool.execute(sql, value)
    return query
}

const SelectZoneWithTitle = () => {
    const sql = `SELECT zone.id,zone.zone_name AS name
                ,title.title_name AS title,zone.transport_non_airplane AS transport
                ,zone.transport_airplane AS airplane
                ,zone.hotel,zone.meal_allowance AS meal,zone.allowance FROM zone JOIN title WHERE zone.title_id = title.id`
    const query = dbPool.execute(sql)
    return query
}

const SelectZoneByTitle = (name) => {
    const sql = `SELECT
    zone.id,zone.zone_name,zone.transport_non_airplane,
    zone.transport_airplane,zone.hotel,zone.meal_allowance,zone.allowance,
    title.id AS title_id,title.title_name FROM zone JOIN title
    WHERE zone.title_id = title.id AND title.title_name = ?`
    const query = dbPool.execute(sql, [name])
    return query
}

const SelectZoneById = (id) => {
    const sql = `SELECT
                zone.id,zone.zone_name,zone.transport_non_airplane,zone.transport_airplane,zone.hotel,zone.meal_allowance,zone.allowance,
                title.title_name
                FROM zone JOIN title WHERE zone.title_id = title.id AND zone.id = ?`
    const query = dbPool.execute(sql, [id])
    return query
}

export default {
    InsertZone,
    SelectZoneWithTitle,
    SelectZoneByTitle,
    SelectZoneById
}