var express = require('express')
var body_parser = require('body-parser')
var mongo_client = require('mongodb').MongoClient


var db

mongo_client.connect('mongodb://ds_admin:ds_password@ds163940.mlab.com:63940/ds_message', (err, database) => {
    if (err) return console.log('DB connect error '+err)
    db = database
    console.log('DB connected') 
})

var app = express()
app.use(body_parser.urlencoded({extended : true}))
app.use(body_parser.json())

var router = express.Router()

router.use((req, res, next) => {
    console.log(req.method + ' request on url : ' + req.url)
    next()
})
/*
    API ENDPOINTS
    URL : http://URL/api/messages
*/
router.route('/messages')
    .post((req, res) => {
        var new_message = {
            lat : req.body.lat,
            long : req.body.long,
            msg : req.body.msg
        }
        db.collection('messages').save(new_message, (err, result) => {
            if (err) return console.log('DB save error POST')
            console.log('DB save done..' + JSON.stringify(new_message))
            res.end()
        })
    })
    .get((req, res) => {
        var lat = req.query.lat
        var long = req.query.long
        res.json({
            message : "Goodbye money",
            lat : lat,
            long : long
        })
    })

app.use("/api", router)


app.listen(3000, () => {
    console.log("Server listening on 3000")
})