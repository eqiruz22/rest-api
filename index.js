import express from 'express'
import cors from 'cors'
import UserRoute from './src/routes/user/UserRoute.js'
const app = express()

const port = 4001
app.use(cors())
app.use(express.json())
app.use(UserRoute)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
