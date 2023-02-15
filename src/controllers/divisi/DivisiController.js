import DivisiModel from "../../models/divisi/DivisiModel.js";

const createDivisi = async (req, res) => {
    const divisi_name = req.body.divisi_name
    const divisi_head = req.body.divisi_head

    if (!req.body.divisi_name) {
        return res.status(500).json({
            message: 'Divisi name cannot be null'
        })
    }

    if (!req.body.divisi_head) {
        return res.status(500).json({
            message: 'Divisi head cannot be null'
        })
    }

    try {
        const data = await DivisiModel.InsertDivisi(divisi_name, divisi_head)
        return res.status(201).json({
            message: 'Success create divisi'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while create divisi',
            error: error
        })
    }
}

const fetchDivisiWithHead = async (req, res) => {
    try {
        const [row] = await DivisiModel.SelectDivisiWithHead()
        return res.status(200).json({
            message: 'Show all divisi',
            result: row
        })
    } catch (error) {
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
        return res.status(201).json({
            message: 'success show divisi by id',
            result: row
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while fetch data divisi by id',
            error
        })
    }
}

const updateDivisi = async (req, res) => {
    let id = req.params.id
    const name = req.body.divisi_name
    const head = req.body.divisi_head
    if (!req.body.divisi_name) {
        return res.status(400).json({
            message: 'Divisi name cannot be null'
        })
    }
    if (!req.body.divisi_head) {
        return res.status(400).json({
            message: 'Divisi head cannot be null'
        })
    }
    try {
        const data = await DivisiModel.UpdateDivisi(name, head, id)
        return res.status(200).json({
            message: 'update success'
        })
    } catch (error) {
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
        return res.status(500).json({
            message: 'Error while delete divisi',
            error: error
        })
    }
}

export default {
    createDivisi,
    fetchDivisiWithHead,
    fetchDivisiById,
    updateDivisi,
    destroyDivisi
}