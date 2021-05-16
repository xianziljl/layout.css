const fs = require('fs')
const { join } = require('path')

run()

function run() {
  const path = join(__dirname, 'dist')
  fs.readdir(path, (err, files) => {
    if (!err && files && files.length) {
      files.forEach(file => fixClassNames(join(path, file)))
    }
  })
}

function fixClassNames(path) {
  fs.readFile(path, 'utf-8', (err, _data) => {
    const arr = _data
      .replace(/\}\s\}/g, '}\n}')
      .replace(/\)\s\{\s\./g, ') {\n  .')
      .split('\n').filter(item => item)

    const newArr = arr.map(str => {
      const match = str.match(/\w+-\d+\./)
      if (!match) return str
      return str.replace(match[0], match[0].replace('.', '\\.'))
    })
    const data = fixMediaQueryToEnd(newArr).join('\n');
    
    fs.writeFile(path, data, 'utf-8', () => {
      console.log(`write file ${path}`)
    })
  })
}

function fixMediaQueryToEnd(arr) {
  const lines = []
  const mediaLines = []
  let isMedia = false
  arr.forEach(str => {
    if (str.match(/^@media/)) isMedia = true
    if (isMedia) mediaLines.push(str)
    else lines.push(str)
    if (str === '}') isMedia = false
  })
  return lines.concat(mediaLines)
}