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


const UpdatePerdin = () => {

}

const UpdateStatusBatchOne = () => {

}

const UpdateStatusComplete = () => {

}

export default {
    SelectPerdin,
    InsertPerdin,
    UpdatePerdin,
    UpdateStatusBatchOne,
    UpdateStatusComplete,

}