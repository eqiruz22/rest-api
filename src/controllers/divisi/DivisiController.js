import DivisiModel from "../../models/divisi/DivisiModel.js";

const createDivisi = async (req, res) => {
    const divisi_name = req.body.divisi_name
    const divisi_head = req.body.divisi_head
    const divisi_manager = req.body.divisi_manager
    if (!req.body.divisi_name) {
        return res.status(400).json({
            message: 'Divisi name cannot be null'
        })
    }
    if (!req.body.divisi_manager) {
        return res.status(400).json({
            message: 'Divisi manager cannot be null'
        })
    }
    if (!req.body.divisi_head) {
        return res.status(400).json({
            message: 'Divisi head cannot be null'
        })
    }

    try {
        const data = await DivisiModel.InsertDivisi(divisi_name, divisi_manager, divisi_head)
        return res.status(201).json({
            message: 'Success create divisi'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while create divisi',
            error: error
        })
    }
}

const fetchDivisi = async (req, res) => {
    try {
        const [row] = await DivisiModel.SelectDivisi()
        return res.status(200).json({
            message: 'show all divisi',
            result: row
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error fetching data divisi',
            error: error
        })
    }
}

const fetchDivisiWithHead = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 0
        const limit = parseInt(req.query.limit) || 10
        const search = req.query.query || ''
        const offset = limit * page
        const [totalRow] = await DivisiModel.CountDivisi(search)
        const [row] = await DivisiModel.SelectDivisiWithHead(search, offset, limit)
        const totalPage = Math.ceil(totalRow[0]['divisi'] / limit)
        return res.status(200).json({
            message: 'Show all divisi with head departement',
            result: row,
            page: page,
            limit: limit,
            row: totalRow[0]['divisi'],
            totalPage: totalPage
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetch data divisi',
            error: error
        })
    }
}

const fetchDivisiById = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await DivisiModel.SelectDivisiById(id)
        return res.status(200).json({
            message: 'success show divisi by id',
            result: row
        })
    } catch (error) {
        console.log(errro)
        return res.status(500).json({
            message: 'Error while fetch data divisi by id',
            error
        })
    }
}

const updateDivisi = async (req, res) => {
    const name = req.body.divisi_name
    const manager = req.body.divisi_manager
    const head = req.body.divisi_head
    const id = req.params.id
    if (!req.body.divisi_name) {
        return res.status(400).json({
            message: 'Divisi name cannot be null'
        })
    }
    if (!req.body.divisi_manager) {
        return res.status(400).json({
            message: 'Divisi manager cannot be null'
        })
    }
    if (!req.body.divisi_head) {
        return res.status(400).json({
            message: 'Divisi head cannot be null'
        })
    }
    try {
        const data = await DivisiModel.UpdateDivisi(name, manager, head, id)
        return res.status(200).json({
            message: 'update success'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while update divisi',
            error: error
        })
    }
}

const destroyDivisi = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await DivisiModel.DeleteDivisi(id)
        return res.status(200).json({
            message: 'Success delete'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while delete divisi',
            error: error
        })
    }
}

export default {
    createDivisi,
    fetchDivisi,
    fetchDivisiWithHead,
    fetchDivisiById,
    updateDivisi,
    destroyDivisi
}