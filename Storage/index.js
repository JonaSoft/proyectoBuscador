const fs = require ('fs'),
      path = require ('path')

module.exports = {

  getAllData: function () {

    var dataPath = __dirname + path.join('/data/data.json')
     console.log(__dirname)
     console.log(dataPath)
    return new Promise ((resolve, reject) =>{
        fs.readFile (dataPath, 'utf8', (err, readData) =>{
        if (err){
          reject (err);
          console.log('Un error')
        }

        else {
          console.log('no hay error va JSON');
          resolve(JSON.parse(readData))
              }
      })
    })
  }
}
