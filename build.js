const fs = require('fs')
const { join } = require('path')

run()

function run() {

  const path = join(__dirname, 'dist')

  fs.readdir(path, (err, files) => {
    if (!err && files && files.length) {
      files.forEach(file => {
        fixClassNames(join(path, file))
      })
    }
  })
}

function fixClassNames(path) {
  fs.readFile(path, 'utf-8', (err, _data) => {
    const arr = _data.split('\n').filter(item => item)
    console.log(arr)
    // const match = data.match(/\n?\s*\.[\w-.\\:]+(\s|\,)/g)
    // if (match) {
    //   match.forEach(item => {
    //     console.log(item)
    //     // let str = item.replace(/\n\s*\./, '')
    //     // str = str.replace('.', '\\.')
    //     // str = '\n.' + str
    //     // // console.log(str)
    //     // data = data.replace(item, str)
    //   })
    // }
    // console.log(data)
    // match.forEach(item => {
    //   console.log(item || '-')
    // })
    // const arr = data.split(/\n/)
    // arr.forEach(str => {
    //   if (str.length) {
    //     let className = str.match(/^\s*\.[\w-.\\:]+\s*\{/)
    //     console.log(str, className ? className[0] : 'null')
    //   }
    // })
  })
}