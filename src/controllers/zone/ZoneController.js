import ZoneModel from "../../models/zone/ZoneModel.js";

const createZone = async (req, res) => {
    const zone = req.body.zone_name
    const title = req.body.title_id
    const transport = req.body.transport_non_airplane
    const airplane = req.body.transport_airplane
    const hotel = req.body.hotel
    const meal = req.body.meal_allowance
    const allowance = req.body.allowance

    if (!req.body.zone_name) {
        return res.status(400).json({
            message: 'Zone Name cannot be null'
        })
    }
    if (!req.body.title_id) {
        return res.status(400).json({
            message: 'Title id cannot be null'
        })
    }
    if (!req.body.transport_non_airplane) {
        return res.status(400).json({
            message: 'Transport Non Airplane cannot be null'
        })
    }
    if (!req.body.transport_airplane) {
        return res.status(400).json({
            message: 'Transport Airplane cannot be null'
        })
    }
    if (!req.body.hotel) {
        return res.status(400).json({
            message: 'Hotel cannot be null'
        })
    }
    if (!req.body.meal_allowance) {
        return res.status(400).json({
            message: 'Meal Allowance cannot be null'
        })
    }
    if (!req.body.allowance) {
        return res.status(400).json({
            message: 'Allowance cannot be null'
        })
    }

    try {
        const data = await ZoneModel.InsertZone(zone, title, transport, airplane, hotel, meal, allowance)
        return res.status(200).json({
            message: 'Success create new zone'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while creaete zone',
            error: error
        })
    }
}

const fetchZoneWithTitle = async (req, res) => {
    try {
        const [row] = await ZoneModel.SelectZoneWithTitle()
        return res.status(200).json({
            message: 'Show zone with title',
            result: row
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching zone with title',
            error: error
        })
    }
}

const fetchZoneByName = async (req, res) => {
    const name = req.params.name
    try {
        const [data] = await ZoneModel.SelectZoneByTitle(name)
        return res.status(200).json({
            message: 'Success fetching zone by title name',
            result: data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while fetching zone by title name'
        })
    }
}

const fetchZoneById = async (req, res) => {
    let id = req.params.id
    try {
        const [data] = await ZoneModel.SelectZoneById(id)
        if (data.length < 1) {
            return res.status(404).json({
                message: 'ID not found'
            })
        }
        return res.status(200).json({
            message: 'Show title by id',
            result: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error while fetching zone by id',
            error: error
        })
    }
}

export default {
    createZone,
    fetchZoneWithTitle,
    fetchZoneByName,
    fetchZoneById
}