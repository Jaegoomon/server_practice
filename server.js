const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'passport'

let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bek'
    },
    {
        id: 3,
        name: 'chris'
    }
]

app.get('/users', (req, res) => {
    console.log('who get in here / users')
    res.json(users)
})

app.post('/post', (req, res) => {
    console.log('who get in here post /users')

    var inputData;
    req.on('data', (data) => {
        inputData = JSON.parse(data)
    })
    req.on('end', () => {
        MongoClient.connect(url, (err, client) => {
            if (err) throw err
            var db = client.db(dbName)
            var obj = { name: inputData.name, pwd: inputData.pwd }
            db.collection("characters").insertOne(obj, (err, res) => {
                if (err) throw err
                console.log("1 document inserted")
                client.close()
            })
        })
        console.log("user_id: " + inputData.name + " , name : " + inputData.pwd)
    })
    res.write("OK!")
    res.end()
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})





