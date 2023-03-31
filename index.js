import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import MainRoute from './src/routes/MainRoute.js'
import http from 'http'
import url from 'url'
import TitleController from './src/controllers/title/TitleController.js'
dotenv.config()
const app = express()
const port = 4001
app.use(cors())


const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true)

    if (req.method === 'GET' && parseUrl.pathname === '/test') {
        TitleController.ForTest(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
            message: 'Not Found'
        }))
    }
})
app.use(express.json())
app.use('/user', MainRoute)

// server.listen(4002, () => {
//     console.log(`server test running on port 4002`)
// })

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
