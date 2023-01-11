import ManagerModel from "../../models/perdin/ManagerModel.js"

const showWaiting = async (req, res) => {
    try {
        const [row] = await ManagerModel.waitingToApprove()
        res.status(200)
            .json({
                message: 'Succes to show',
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
    showWaiting
}