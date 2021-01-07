const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'

const dbName = 'passport'

MongoClient.connect(url, (err, client) => {
    if (err) throw err
    var db = client.db(dbName)
    console.log(`Connected MongoDB: ${url}`)
    console.log(`Database: ${dbName}`)
    var obj = { name: "jaehyuk", pwd: "wh1710302" }
    db.collection("characters").insertOne(obj, (err, res) => {
        if (err) throw err
        console.log("1 document inserted")
        client.close()
    })
})