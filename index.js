const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRoute = require('./src/routes/user')

const port = 4001
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
