var express = require('express')
var body_parser = require('body-parser')

var app = express()
app.use(body_parser.urlencoded({extended : true}))
app.use(body_parser.json())

var router = express.Router()

router.use((req, res, next) => {
    console.log(req.method + " request on url : " + req.url)
    next()
})
/*
    API ENDPOINTS
    URL : http://URL/api/messages



*/
router.route('/messages')
    .post((req, res) => {
        var lat = req.body.lat
        var long = req.body.long
    })
    .get((req, res) => {
        res.json({
            message : "Goodbye money"
        })
    })

app.use("/api", router)


app.listen(3000, () => {
    console.log("Server listening on 3000")
})