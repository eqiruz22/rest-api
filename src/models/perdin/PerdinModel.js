import dbPool from '../../db/Config.js'

const SelectPerdin = () => {
    const sql = `SELECT
                perdin.id,
                perdin.title_name,
                perdin.official_travel_site,
                perdin.purposes,
                perdin.hotel,
                perdin.transport,
                perdin.local_transport,
                perdin.airfare,
                perdin.airport_tax,
                perdin.entertainment,
                perdin.start_date,
                perdin.end_date,
                perdin.fee_support,
                perdin.tools,
                perdin.others, 
                prj.prj_name,
                user.name, 
                status.proses,
                perdin.status_id, 
                perdin.total_received FROM perdin JOIN prj JOIN user JOIN status 
                WHERE perdin.prj_id = prj.id AND perdin.user_id = user.id AND perdin.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const SelectPerdinDaily = () => {
    const sql = `SELECT
                perdin_harian.id,
                perdin_harian.title_name,
                perdin_harian.official_travel_site,
                perdin_harian.purposes,
                perdin_harian.hotel,
                perdin_harian.transport,
                perdin_harian.local_transport,
                perdin_harian.airfare,
                perdin_harian.airport_tax,
                perdin_harian.entertainment,
                perdin_harian.start_date,
                perdin_harian.end_date,
                perdin_harian.days,
                perdin_harian.fee_support,
                perdin_harian.tools,
                perdin_harian.others,
                perdin_harian.total_received,
                user.name,
                prj.prj_name,
                status.proses,
                perdin_harian.status_id, perdin_harian.user_id FROM perdin_harian JOIN prj JOIN user JOIN status
                WHERE perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id and perdin_harian.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const SelectPerdinDailyId = (id) => {
    const sql = `SELECT
                perdin_harian.id,
                perdin_harian.title_name,
                perdin_harian.official_travel_site,
                perdin_harian.purposes,
                perdin_harian.hotel,
                perdin_harian.transport,
                perdin_harian.local_transport,
                perdin_harian.airfare,
                perdin_harian.airport_tax,
                perdin_harian.entertainment,
                perdin_harian.start_date,
                perdin_harian.end_date,
                perdin_harian.days,
                perdin_harian.fee_support,
                perdin_harian.tools,
                perdin_harian.others,
                perdin_harian.total_received,
                user.name,
                prj.prj_name,
                status.proses,
                perdin_harian.status_id, perdin_harian.user_id FROM perdin_harian JOIN prj JOIN user JOIN status
                WHERE perdin_harian.prj_id = prj.id AND perdin_harian.user_id = user.id AND perdin_harian.status_id = status.id
                AND user.id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const InsertPerdin = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin
                 (prj_id,user_id,title_name,status_id,delegate_approval,official_travel_site,purposes,hotel,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent,transport,local_transport,airfare,airport_tax,entertainment,start_date,end_date,fee_support,tools,others,total_received) VALUES
                 ('${body.prj_id}',
                 '${body.user_id}',
                 '${body.title_name}',
                  1,
                 '${body.delegate_approval}',
                 '${body.official_travel_site}',
                 '${body.purposes}',
                 '${body.hotel}',
                 '${body.rent_house}',
                 '${body.meal_allowance}',
                 '${body.hardship_allowance}',
                 '${body.pulsa_allowance}',
                 '${body.car_rent}',
                 '${body.transport}',
                 '${body.local_transport}',
                 '${body.airfare}',
                 '${body.airport_tax}',
                 '${body.entertainment}',
                 '${start_date}',
                 '${end_date}',
                 '${body.fee_support}',
                 '${body.tools}',
                 '${body.others}',
                 '${body.total_received}')`
    const query = dbPool.execute(sql)
    return query
}

const InsertPerdinDaily = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin_harian
                 (prj_id,user_id,title_name,status_id,delegate_approval,official_travel_site,purposes,hotel,rent_house,meal_allowance,hardship_allowance,pulsa_allowance,car_rent,transport,local_transport,airfare,airport_tax,entertainment,start_date,end_date,days,fee_support,tools,others,total_received) VALUES
                 ('${body.prj_id}',
                 '${body.user_id}',
                 '${body.title_name}',
                  1,
                 '${body.delegate_approval}',
                 '${body.official_travel_site}',
                 '${body.purposes}',
                 '${body.hotel}',
                 '${body.rent_house}',
                 '${body.meal_allowance}',
                 '${body.hardship_allowance}',
                 '${body.pulsa_allowance}',
                 '${body.car_rent}',
                 '${body.transport}',
                 '${body.local_transport}',
                 '${body.airfare}',
                 '${body.airport_tax}',
                 '${body.entertainment}',
                 '${start_date}',
                 '${end_date}',
                 '${body.days}',
                 '${body.fee_support}',
                 '${body.tools}',
                 '${body.others}',
                 '${body.total_received}')`
    const query = dbPool.execute(sql)
    return query
}

const InsertManagerApproval = (perdin_id, prj_id, user_id) => {
    const sql = `INSERT INTO manager_approval (perdin_id,prj_id,user_id,status_id) VALUES ('${perdin_id}','${prj_id}','${user_id}',1)`
    const query = dbPool.execute(sql)
    return query
}

const InsertDirectorApproval = (perdin_id, prj_id, user_id) => {
    const sql = `INSERT INTO director_approval (perdin_id,prj_id,user_id,status_id) VALUES ('${perdin_id}','${prj_id}','${user_id}',1)`
    const query = dbPool.execute(sql)
    return query
}

const waitingToApproveManager = () => {
    const sql = `SELECT manager_approval.id,
                  user.name,
                  prj.prj_name,
                  perdin.official_travel_site,
                  perdin.total_received,
                  status.proses,
                  manager_approval.perdin_id,
                  manager_approval.prj_id,
                  manager_approval.user_id,
                  manager_approval.status_id FROM manager_approval JOIN prj JOIN perdin JOIN user JOIN status 
                  WHERE manager_approval.perdin_id = perdin.id 
                  AND manager_approval.prj_id = prj.id AND manager_approval.user_id = user.id AND manager_approval.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const waitingToApproveDirector = () => {
    const sql = `SELECT director_approval.id,
                user.name,
                prj.prj_name,
                perdin.official_travel_site,
                perdin.total_received,
                status.proses,
                director_approval.perdin_id,
                director_approval.prj_id,
                director_approval.user_id,
                director_approval.status_id FROM director_approval JOIN prj JOIN perdin JOIN user JOIN status 
                WHERE director_approval.perdin_id = perdin.id 
                AND director_approval.prj_id = prj.id AND director_approval.user_id = user.id AND director_approval.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const UpdateApprovalByManager = (id) => {
    const sql = `UPDATE manager_approval SET status_id = 4 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const UpdatePerdinStatusByManager = (id) => {
    const sql = `UPDATE perdin SET status_id = 2 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query

}

const UpdateApprovalByDirector = (id) => {
    const sql = `UPDATE director_approval SET status_id = 4 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const UpdatePerdinStatusByDirector = (id) => {
    const sql = `UPDATE perdin SET status_id = 3 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}


export default {
    SelectPerdin,
    SelectPerdinDaily,
    SelectPerdinDailyId,
    InsertPerdin,
    InsertPerdinDaily,
    InsertManagerApproval,
    InsertDirectorApproval,
    waitingToApproveManager,
    waitingToApproveDirector,
    UpdateApprovalByManager,
    UpdateApprovalByDirector,
    UpdatePerdinStatusByManager,
    UpdatePerdinStatusByDirector
}