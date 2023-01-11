import PrjModel from "../../models/prj/PrjModel.js";

const fetchById = async (req, res) => {
    try {
        const [row] = await PrjModel.SelectId()
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

export default {
    fetchById
}