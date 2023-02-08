import PrjModel from "../../models/prj/PrjModel.js";

const fetchPrj = async (req, res) => {
    try {
        const [row] = await PrjModel.SelectPrj()
        res.status(201)
            .json({
                message: 'Show prj',
                result: row
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Error',
                Error: error
            })
    }
}

const createPrj = async (req, res) => {
    const prj_name = req.body.prj_name
    const status = req.body.status

    if (!req.body.prj_name) {
        return res.status(500).json({
            message: 'Prj Name must be have a value'
        })
    }

    if (!req.body.status) {
        return res.status(500).json({
            message: 'Status must be open or closed'
        })
    }
    try {
        const data = await PrjModel.InsertPrj(prj_name, status)
        return res.status(200).json({
            message: 'Succes create new PRJ'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error while created PRJ',
            Error: error
        })
    }
}

const fetchById = async (req, res) => {
    let id = req.params.id
    try {
        const [row] = await PrjModel.SelectById(id)
        return res.status(200).json({ message: 'show by id', result: row })
    } catch (error) {
        return res.status(500).json({ message: 'error while fetching data', error: error })
    }
}

export default {
    fetchPrj,
    fetchById,
    createPrj
}