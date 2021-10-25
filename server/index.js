const express = require('express')
const app = express();
const Axios = require('axios')
const bodyParse = require('body-parser')
const mysql = require("mysql");
const cors = require("cors");
const { encrypt, decrypt } = require("./EncryptionMethods");
const convert = require('xml-js');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csvtojson')
const multer = require('multer')


app.use(express.json());
app.use(cors());

const dashDB = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password1",
    database: "dashboarddb",
});

app.post('/Register', (req, res) => {
    const { username, password, email, photo } = req.body
    const encryptedPassword = encrypt(password);
    dashDB.query("INSERT INTO dashboarddb.users (username, password, buffer, email, photo) VALUES (?,?,?,?,?)",
        [username, encryptedPassword.password, encryptedPassword.initial, email, photo],
        (error, result) => {
            if (error) {
                res.send({ error: error })
            }
            if (result) {
                res.send(result)
            }
        }
    );
});

app.post('/Login', (req, res) => {
    const { username, password } = req.body
    // only unique usernames allowed
    dashDB.query("SELECT password, buffer FROM dashboarddb.users WHERE username = ?",
        [username],
        (error, result) => {
            if (error) {
                res.send({ error: error })
            }
            if (result) {
                const decryptedPassword = (decrypt({ initial: result[0].buffer, password: result[0].password }))
                if (decryptedPassword === password) {
                    res.send(result)
                }
                else {
                    res.send("Invalid password")
                }
            }
        }
    )
});

app.get('/News', (req, res) => {
    const url = 'http://feeds.bbci.co.uk/news/rss.xml';
    const newsOptions = {
        method: 'GET',
        url: url
    };
    Axios.request(newsOptions).then((response) => {
        const result = convert.xml2json(response.data, { compact: true, spaces: 4 });
        res.send(result)
    }).catch((error) => {
        res.send({ error: error })
    });
})

app.post('/NewsStory', (req, res) => {
    const url = req.body.link;
    puppeteer
        .launch()
        .then(browser => browser.newPage())
        .then(page => {
            return page.goto(url).then(function () {
                return page.content();
            });
        })
        .then(html => {
            const $ = cheerio.load(html);
            let fullText = "";
            $('p').each(function () {
                // Better way to remove unwanted text
                let text = ($(this).text())
                if (!(["We use cookies", "Yes, I agree", "No, take me to settings"].some(v => text.includes(v)))) {
                    fullText += " " + text
                }
            });
            // Assume first image is main article image
            let imageList = []
            $('img').each(function () {
                imageList.push($(this).attr('srcset'))
            });

            const headImage = imageList[0].split(',')[0]
            res.send({ text: fullText, image: headImage })
        })
        .catch((error) => {
            res.send({ error: error })
        });
})


app.get('/TeamFile', (req, res) => {
    csv()
        .fromFile('../client/src/Assets/teams.csv')
        .then((jsonObj) => {
            res.send(jsonObj)
        })
        .catch((error) => {
            res.send({ error: error })
        });
})

app.post('/RecentPhotos', (req, res) => {
    dashDB.query("SELECT photolink FROM dashboarddb.photos WHERE user = ? order by created desc limit 5",
    [req.body.username],
    (error, result) => {
            if (error) {
                res.send({ error: error })
            }
            if (result) {
                res.send(result)
            }
        })
})

app.post('/DeleteImage', (req, res) => {
    dashDB.query("DELETE FROM dashboarddb.photos WHERE user= ? AND photolink = ?",
    [req.body.username, req.body.photo],
    (error, result) => {
        if (error) {
            res.send({ error: error })
        }
        if (result) {
                res.send(result)
            }
        }
        );
})


app.post('/PostImageDB', (req, res) => {
    dashDB.query("INSERT INTO dashboarddb.photos (user, photolink) VALUES (?,?)",
    [req.body.username, req.body.fileName],
    (error, result) => {
        if (error) {
            res.send({ error: error })
        }
        if (result) {
                res.send(result)
            }
        }
        );
})

app.post('/PostTask', (req, res) => {
    dashDB.query("INSERT INTO dashboarddb.tasks (status, description,user) VALUES (?,?,?)",
    [req.body.status, req.body.description, req.body.username],
    (error, result) => {
        if (error) {
            res.send({ error: error })
        }
        if (result) {
                res.send(result)
            }
        }
    );
})

app.post('/UpdateTask', (req, res) => {
    dashDB.query("UPDATE dashboarddb.tasks SET status = ?, description= ? WHERE taskid = ?",
    [req.body.status, req.body.description, req.body.taskId],
    (error, result) => {
        if (error) {
            res.send({ error: error })
        }
        if (result) {
                res.send(result)
            }
        }
    );
})

app.post('/GetTasks', (req, res) => {
    dashDB.query("SELECT taskid, description, status FROM dashboarddb.tasks WHERE user = ? order by taskid",
    [req.body.username],
    (error, result) => {
            if (error) {
                res.send({ error: error })
            }
            if (result) {
                res.send(result)
            }
        })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}`)
    }
})

const upload = multer({storage});

app.post("/SaveImage", upload.single("image"), (req, res) => {
    res.status(201).json({path: req.file.filename});
})

app.get('/', (req, res) => { res.send("hello world") })
app.listen(3001, () => {
    console.log('running')
})
