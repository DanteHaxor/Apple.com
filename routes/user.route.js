const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcryptjs')
const Usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AUTH_COOKIE = 'authToken'
const NAME_COOKIE = 'displayName'

const cookieOptions = {
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: 'lax',
  httpOnly: false,
}

userRouter.post('/register', (req, res) => {
  const { firstname, lastname, country, dob, email, password } = req.body
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      console.log(err)
      res.status(500).send({ error: 'Registration failed' })
    } else {
      const rdata = Usermodel({ firstname, lastname, country, dob, email, password: hash })
      await rdata.save()
      res.send('user registered successfully')
    }
  })
})

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  const data = await Usermodel.findOne({ email })
  if (!data) {
    return res.status(401).send('wrong credentials')
  }
  bcrypt.compare(password, data.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ userID: data._id }, process.env.key)
      const displayName = `${data.firstname} ${data.lastname}`
      res.cookie(AUTH_COOKIE, token, cookieOptions)
      res.cookie(NAME_COOKIE, displayName, cookieOptions)
      res.send({ msg: 'login success', token, displayName })
    } else {
      console.log(err)
      res.status(401).send('wrong credentials')
    }
  })
})

userRouter.post('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE, { path: '/' })
  res.clearCookie(NAME_COOKIE, { path: '/' })
  res.send({ msg: 'logged out' })
})

module.exports = userRouter
