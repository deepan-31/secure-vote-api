require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jsonParser = bodyParser.json();

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error' , (error) => console.error(error))
db.once('open', () => console.log('Connected to database ^_^'))


const votersRouter = require('./routes/voters')
const adminsRouter = require('./routes/admins')
const createCandidatesRouter = require('./routes/createCandidates')
const twilioRouter = require('./routes/twilio-sms.js')

app.use(cors())
app.use(jsonParser)
app.use('/twilio-sms', twilioRouter)
app.use(express.json())
app.use('/voters',votersRouter)
app.use('/admins',adminsRouter)
app.use('/createCandidates',createCandidatesRouter)
app.listen(3000,()=>
            console.log('Server started ^_^'))



            