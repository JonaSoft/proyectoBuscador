var bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express')
    routing    = require('./server/requestRouting')

var port       = port = process.env.PORT || 8080,
    app        = express(),
    Server     = http.createServer(app)
var path = require ('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'./public'))

})

app.use('/bdjson', routing)
Server.listen(port, () => {
  console.log("Servidor corriendo en el puerto: " + port)
})
