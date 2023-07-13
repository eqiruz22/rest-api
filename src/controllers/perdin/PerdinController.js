import PerdinModel from "../../models/perdin/PerdinModel.js";
import UserModel from "../../models/user/UserModel.js";
import DivisiModel from "../../models/divisi/DivisiModel.js";
import Email from "../../helper/Email.js";
import { formatDateWithoutTime } from "../../helper/helperDate.js";

const showPerdin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdin(search)
        const [data] = await PerdinModel.SelectPerdin(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        res.status(200)
            .json({
                message: 'Show All data perdin',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: 'Error while fetching perdin',
                result: error
            })
    }
}

const showPerdinDaily = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdinDaily(search)
        const [data] = await PerdinModel.SelectPerdinDaily(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        if (data.length < 1) {
            return res.status(200)
                .json({
                    message: 'no data perdin for show',
                    result: data,
                    page: page,
                    limit: limit,
                    row: totalRow[0]['perdin'],
                    totalPage: totalPage
                })
        }
        return res.status(200)
            .json({
                message: 'success get data perdin daily',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error while fetching perdin',
                error: error
            })
    }
}

const showPerdinDailyById = async (req, res) => {
    let id = req.params.id
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountPerdinDailyById(id, search)
        const [data] = await PerdinModel.SelectPerdinDailyId(id, search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['perdin'] / limit)
        if (data.length < 1) {
            return res.status(200)
                .json({
                    message: 'no data perdin for show by id',
                    result: data,
                    page: page,
                    limit: limit,
                    row: totalRow[0]['perdin'],
                    totalPage: totalPage
                })
        }
        return res.status(200)
            .json({
                message: 'show data perdin by id',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['perdin'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching perdin by id',
            error: error
        })
    }
}

const createPerdin = async (req, res) => {
    let { body } = req
    const formatDateStart = (start) => {
        const d = new Date(start)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const formatDateEnd = (end) => {
        const d = new Date(end)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }
    const start = req.body.start_date
    const end = req.body.end_date
    const formatStartDate = formatDateStart(start)
    const formatEndDate = formatDateEnd(end)

    if (!req.body) {
        return res.json({
            message: 'All field is required'
        })
    }

    try {
        const data = await PerdinModel.InsertPerdin(body, formatStartDate, formatEndDate)
        return res.status(201)
            .json({
                message: 'Success create perdin',
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                result: error
            })
    }
}

const createPerdinDaily = async (req, res) => {
    const { body } = req
    const start = req.body.start_date
    const end = req.body.end_date
    const startDate = (start) => {
        const d = new Date(start)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    const endDate = (end) => {
        const d = new Date(end)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    if (!req.body) {
        return res.status(400).json({
            message: 'all field is required'
        })
    }

    const resultStart = startDate(start)
    const resultEnd = endDate(end)
    try {
        const dailyPerdin = await PerdinModel.InsertPerdinDaily(body, resultStart, resultEnd)
        const [userId] = await UserModel.SelectById(req.body.user_id)
        const insertId = dailyPerdin[0]['insertId']
        const name = userId[0]['divisi_name']
        const [divisi] = await DivisiModel.SelectDivisiName(name)
        const [forApprovalManager] = await UserModel.SelectById(divisi[0]['divisi_manager'])
        const [forApprovaldivHead] = await UserModel.SelectById(divisi[0]['divisi_head'])
        if (['Manager', 'Sr Manager', 'VP', 'SVP'].includes(userId[0]['title_name'])) {
            await PerdinModel.InsertDivisiApproval(insertId, req.body.prj_id, forApprovaldivHead[0]['id'])
            Email.sendEmail(forApprovaldivHead[0]['email'], forApprovaldivHead[0]['name'])
            return res.status(200).json({
                message: 'success',

            })
        } else {
            await PerdinModel.InsertDivisiApproval(insertId, req.body.prj_id, forApprovalManager[0]['id'])
            Email.sendEmail(forApprovalManager[0]['email'], forApprovalManager[0]['name'])
            return res.status(200).json({
                message: 'success',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error',
            error: error
        })
    }
}

const updatePerdinDaily = async (req, res) => {
    const data = {
        prj_id: req.body.prj_id,
        user_id: req.body.user_id,
        title_name: req.body.title_name,
        zone_id: req.body.zone_id,
        maksud_perjalanan: req.body.maksud_perjalanan,
        tempat_tujuan: req.body.tempat_tujuan,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        lama_perjalanan: req.body.lama_perjalanan,
        transport_tujuan: req.body.transport_tujuan,
        transport_local: req.body.transport_local,
        penginapan: req.body.penginapan,
        meals: req.body.meals,
        allowance: req.body.allowance,
        rapid: req.body.rapid,
        lain: req.body.lain,
        jumlah_advance: req.body.jumlah_advance,
        id: req.body.id
    }

    if (!req.body.prj_id) {
        return res.status(400).json({
            message: 'PRJ ID is required!'
        })
    }
    if (!req.body.user_id) {
        return res.status(400).json({
            message: 'Name is required!'
        })
    }
    if (!req.body.title_name) {
        return res.status(400).json({
            message: 'Title is required!'
        })
    }
    if (!req.body.zone_id) {
        return res.status(400).json({
            message: 'Zone name is required!'
        })
    }
    if (!req.body.maksud_perjalanan) {
        return res.status(400).json({
            message: 'Maksud perjalanan is required!'
        })
    }
    if (!req.body.tempat_tujuan) {
        return res.status(400).json({
            message: 'Tempat tujuan is required!'
        })
    }
    if (!req.body.lama_perjalanan) {
        return res.status(400).json({
            message: 'Lama perjalanan is required!'
        })
    }
    if (!req.body.transport_tujuan) {
        return res.status(400).json({
            message: 'Transport tujuan is required!'
        })
    }
    if (!req.body.transport_local) {
        return res.status(400).json({
            message: 'Transport local is required!'
        })
    }
    if (!req.body.penginapan) {
        return res.status(400).json({
            message: 'Penginapan is required!'
        })
    }
    if (!req.body.meals) {
        return res.status(400).json({
            message: 'Meals is required!'
        })
    }
    if (!req.body.allowance) {
        return res.status(400).json({
            message: 'Allowance is required!'
        })
    }

    if (!req.body.jumlah_advance) {
        return res.status(400).json({
            message: 'Jumlah Advance is required!'
        })
    }
    try {
        const [result] = await PerdinModel.SelectPerdinDetail(data.id)
        if (result.length < 1) {
            return res.status(404).json({
                message: `Perdin id ${data.id} not found`
            })
        } else {
            await PerdinModel.UpdatePerdin(
                data.prj_id,
                data.user_id,
                data.title_name,
                data.zone_id,
                data.maksud_perjalanan,
                data.tempat_tujuan,
                data.start_date,
                data.end_date,
                data.lama_perjalanan,
                data.transport_tujuan,
                data.transport_local,
                data.penginapan,
                data.meals,
                data.allowance,
                data.rapid,
                data.lain,
                data.jumlah_advance,
                data.id
            )
            return res.status(200).json({
                message: 'Updated'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }

}

const showWaitingToDivisi = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountDivisiApproval(search)
        const [row] = await PerdinModel.waitingToApproveDivisi(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['divisi_count'] / limit)
        return res.status(200)
            .json({
                message: 'Succes to show',
                result: row,
                page: page,
                limit: limit,
                row: totalRow[0]['divisi_count'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const showWaitingToDivisiById = async (req, res) => {
    let id = req.params.id
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountDivisiApprovalById(id, search)
        const [data] = await PerdinModel.waitingToApproveDivisiById(id, search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['divisi_count'] / limit)
        if (data.length < 1) {
            return res.status(404).json({
                message: 'no data for show waiting divisi approval by id',
                result: data,
                page: page,
                limit: limit,
                row: totalRow[0]['divisi_count'],
                totalPage: totalPage
            })
        }
        return res.status(200).json({
            message: 'show waiting divisi approval by id',
            result: data,
            page: page,
            limit: limit,
            row: totalRow[0]['divisi_count'],
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error while fetching data approval by id'
        })
    }
}

const updateApprovedDivisi = async (req, res) => {
    const id = req.body.id
    const perdin_id = req.body.perdin_id
    const user = req.body.approved_divisi
    const check = req.body.divisi_check
    const name = req.body.dv_name
    try {
        const [row] = await DivisiModel.SelectDivisiForPermissionApproval(check, check, name)
        if (row.length < 1) {
            return res.status(403).json({
                message: 'you dont have permission to perform this action'
            })
        } else {
            await PerdinModel.UpdateApprovalByDivisi(id)
            await PerdinModel.UpdatePerdinDailyStatusByDivisi(user, perdin_id)
            await PerdinModel.InsertHcApproval(perdin_id)
            return res.status(200).json({
                message: 'Approved',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const showWaitingToHc = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await PerdinModel.CountApprovalHC(search)
        const [row] = await PerdinModel.waitingToApproveHc(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['hc_count'] / limit)
        return res.status(200)
            .json({
                message: 'Show waiting',
                result: row,
                page: page,
                limit: limit,
                row: totalRow[0]['hc_count'],
                totalPage: totalPage
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const updateApprovedHc = async (req, res) => {
    const id = req.body.id
    const perdin_id = req.body.perdin_id
    const user = req.body.approved_hc

    try {
        if (req.body.divisi === 'HC') {
            if (req.body.title === 'Manager' || req.body.title === 'Sr Manager') {
                await PerdinModel.UpdateApprovalByHc(id)
                await PerdinModel.UpdatePerdinDailyStatusByHc(user, perdin_id)
                return res.status(200).json({
                    message: 'Approved'
                })
            } else {
                return res.status(403).json({
                    message: 'you dont have permission to perform this action'
                })
            }
        } else {
            return res.status(403).json({
                message: 'you dont have permission to perform this action'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

const showPerdinDetail = async (req, res) => {
    let id = req.params.id
    try {
        const [data] = await PerdinModel.SelectPerdinDetail(id)
        const result = data.map(item => {
            const start_date = formatDateWithoutTime(item.start_date)
            const end_date = formatDateWithoutTime(item.end_date)
            return {
                ...item,
                start_date,
                end_date
            }
        })
        if (data.length < 1) {
            return res.status(404).json({
                message: `perdin ${id} not found`,
                result: null
            })
        }
        return res.status(200).json({
            message: 'view detail data perdin daily',
            result: result[0]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching perdin daily detail'
        })
    }
}

const destroyPerdinDaily = async (req, res) => {
    let id = req.params.id
    try {
        const data = await PerdinModel.DeletePerdinDaily(id)
        if (data.length < 1) {
            return res.status(404).json({
                message: 'ID not found'
            })
        }
        return res.status(200).json({
            message: 'Delete Perdin Success'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while delete perdin daily'
        })
    }
}




export default {
    showPerdin,
    showPerdinDaily,
    showPerdinDailyById,
    createPerdin,
    createPerdinDaily,
    showWaitingToDivisi,
    showWaitingToDivisiById,
    showWaitingToHc,
    updateApprovedDivisi,
    updateApprovedHc,
    updatePerdinDaily,
    showPerdinDetail,
    destroyPerdinDaily,
}