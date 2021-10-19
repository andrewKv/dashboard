const express = require('express')
const app = express();
const bodyParse = require('body-parser')
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


app.post('/Register', (req,res)=>{
    const encryptedPassword = encrypt(req.body.password);
    const sql = 'INSERT INTO dashboarddb.users (username, password, buffer) VALUES (?,?,?)';
    dashDB.query(sql, encryptedPassword.password, req.body.username, encryptedPassword.initial),
    (err, result)=>{
        if (err){console.log(err)}
        else{res.send("Send Success")}
    }
})

app.get('/Login')

app.listen(3001, () =>{
    console.log('running')
})
