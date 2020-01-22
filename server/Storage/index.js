const fs = require ('fs'),
      path = require ('path')

module.exports = {

  getAllData: function () {

    var dataPath = __dirname + path.join('/data/data.json')
     console.log(__dirname)
     console.log(dataPath)
    return new Promise ((resolve, reject) =>{
        fs.readFile (dataPath, 'utf8', (err, readData) =>{
        if (err) reject (err)
        else resolve(JSON.parse(readData))
      })
    })
  }
}
