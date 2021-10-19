const express = require('express')
const app = express()
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./EncryptionMethods")

app.use(express.json());
app.use(cors);

const dashDB = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "password1",
    database: "DashboardDB",
});

app.get('/', (req, res)=>res.send("hello world"))


app.post('/register', (req,res)=>{
    const encryptedPassword = encrypt(password);
    dashDB.query
})




app.listen(3001, () =>{
    console.log('running')
})
