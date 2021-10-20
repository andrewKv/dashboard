const express = require('express')
const app = express();
const bodyParse = require('body-parser')
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./EncryptionMethods");


app.use(express.json());
app.use(cors()); 

const dashDB = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password1",
    database: "dashboarddb",
}); 

app.post('/Register', (req, res) => {
    const{username, password, email} = req.body
    const encryptedPassword = encrypt(password);
    dashDB.query("INSERT INTO dashboarddb.users (username, password, buffer, email) VALUES (?,?,?,?)",
    [username, encryptedPassword.password, encryptedPassword.initial, email],
        (error, result) => {
            if (error) { 
                res.send({error:error})
             }
             if (result){
                 res.send(result)
             }
        }
    );
});

app.post('/Login', (req,res)=> {
    const{username, password} = req.body
    // only unique usernames allowed
    dashDB.query("SELECT password, buffer FROM dashboarddb.users WHERE username = ?",
    [username],
        (error, result) => {
            if (error) { 
                res.send({error:error})
             }
             if (result){
                 const decryptedPassword = (decrypt({initial: result[0].buffer, password: result[0].password}))
                 if(decryptedPassword === password){
                    res.send(result)
                 }
                 else{
                    res.send("Invalid password")
                 }
             }
        }
    )
});


app.get('/', (req, res) => { res.send("hello world") })
app.listen(3001, () => {
    console.log('running')
})
