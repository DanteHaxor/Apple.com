const mongoose = require('mongoose')
require("dotenv").config()
const connection = mongoose.connect(process.env.mongourl)
module.exports = connection