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

export default {
    InsertZone,
    SelectZoneWithTitle
}