// creating enviroment variable to store our packages 
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')


const app = express()
// body-parser allows you to process json data easily
app.use(bodyParser.json())
// print logs in a certain way
app.use(morgan('combined'))
// managing servers and their accessibility, enabling it may causes security issues 
app.use(cors())


// create endpoint 
require('./routes')(app)

sequelize.sync({force: false}).then(()=>{
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
    
})

app.listen(process.env.PORT || 8081)
