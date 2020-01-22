require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');
routing    = require('./requestRouting');
const path = require ('path')
/*var bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express')
    routing    = require('./server/requestRouting')

var port       = port = process.env.PORT || 3000,
    app        = express(),
    Server     = http.createServer(app)
var path = require ('path')*/

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname+'/public/'))

})

app.use('/bdjson', routing)
/*Server.listen(port, () => {
  console.log("Servidor corriendo en el puerto: " + port)
})*/

app.listen(process.env.PORT, async () => {
  console.log('Escuchando puerto: ', process.env.PORT);
  
});