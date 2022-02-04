const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
const server = require('http').Server(app)
const sockets = require("socket.io")(server)
require('./socket')(sockets) // Se ejecuta la funcion del archivo socket

const PORT = process.env.PORT | 3000

// Archivos Estaticos

app.use(express.static(path.join(__dirname,'public/')))


server.listen(PORT, () =>{
    console.log("SERVIDOR ACTIVO ")
})