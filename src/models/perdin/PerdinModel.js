import dbPool from '../../db/Config.js'

const SelectPerdin = () => {
    const sql = `SELECT
                perdin.id, 
                prj.prj_name,
                user.name, 
                status.proses, 
                perdin.total_received FROM perdin JOIN prj JOIN user JOIN status 
                WHERE perdin.prj_id = prj.id AND perdin.user_id = user.id AND perdin.status_id = status.id`
    const query = dbPool.execute(sql)
    return query
}

const InsertPerdin = (body, start_date, end_date) => {
    const sql = `INSERT INTO perdin
                 (prj_id,user_id,title_id,status_id,delegate_approval,official_travel_site,purposes,hotel,transport,local_transport,airfare,airport_tax,entertainment,start_date,end_date,fee_support,tools,others,total_received) VALUES
                 ('${body.prj_id}',
                 '${body.user_id}',
                 '${body.title_id}',
                  1,
                 '${body.delegate_approval}',
                 '${body.official_travel_site}',
                 '${body.purposes}',
                 '${body.hotel}',
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

const InsertDirectorApproval = (perdin_id, prj_id, user_id) => {
    const sql = `INSERT INTO director_approval (perdin_id,prj_id,user_id,status_id) VALUES ('${perdin_id}','${prj_id}','${user_id}',1)`
    const query = dbPool.execute(sql)
    return query
}

const waitingToApprove = () => {
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

const updateApproval = (id) => {
    const sql = `UPDATE manager_approval SET status_id = 4 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query
}

const UpdatePerdinStatus = (id) => {
    const sql = `UPDATE perdin SET status_id = 2 WHERE id = ${id}`
    const query = dbPool.execute(sql)
    return query

}

const UpdateStatusBatchOne = () => {

}

const UpdateStatusComplete = () => {

}

export default {
    SelectPerdin,
    InsertPerdin,
    InsertDirectorApproval,
    UpdatePerdinStatus,
    UpdateStatusBatchOne,
    UpdateStatusComplete,
    waitingToApprove,
    waitingToApproveDirector,
    updateApproval

}