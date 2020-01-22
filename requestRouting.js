
/*jshint esversion: 8 */
let express = require('express');
let router = express.Router();
let Storage = require('./Storage')


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
