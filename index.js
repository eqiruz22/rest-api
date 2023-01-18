import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import MainRoute from './src/routes/MainRoute.js'
dotenv.config()
const app = express()
const port = 4001
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/user', MainRoute)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
