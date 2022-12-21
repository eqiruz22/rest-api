import express from 'express'
import cors from 'cors'
import MainRoute from './src/routes/MainRoute.js'
const app = express()

const port = 4001
app.use(cors())
app.use(express.json())
app.use('/user', MainRoute)



app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
