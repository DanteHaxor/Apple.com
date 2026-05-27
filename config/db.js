const mongoose = require('mongoose')
const dns = require('dns')
require('dotenv').config()

mongoose.set('strictQuery', true)

// Use public DNS when the system resolver refuses SRV lookups (querySrv ECONNREFUSED)
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

const connection = mongoose.connect(process.env.mongourl, {
  serverSelectionTimeoutMS: 15000,
})

module.exports = connection
