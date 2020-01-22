
var express = require('express');
var router = express.Router();
var Storage = require('./storage')


router.get('/', (req, res) => {
  console.log('Invocando desde directorio raiz')
  Storage.getAllData()
    .then((data) => {
      res.json(data)
    }).catch((error) =>{
      res.sendStatus(500).json(error)
    })
})



module.exports = router;
