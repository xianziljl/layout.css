const fs = require('fs')
const { join } = require('path')

// run()

// const files = fs.readdirSync('dist')
// files.forEach(f => {
//   const path = join(__dirname, 'dist', f)
//   const data = fs.readFileSync(path, 'utf-8')
//   const arr = data.split('\n')
//   const map = []
//   arr.forEach((str, index) => {
//     const cls = str.match(/^\s*[\w-:\.\\]+\s/)
//     if (!cls) return
//     const name = cls[0]
//       .replace(/\s/g, '')
//       .replace(/^\./, '')
//       .replace(/\\/g, '')
//       .replace(':focus', '')
//       .replace(':hover', '')
//       .replace(':active', '')
//     map.push({ name, index })
//   })
// })
// fs.writeFile('x.txt', Array.from(all).join('\n'), 'utf-8', () => {})

function run() {
  const path = join(__dirname, './')
  fs.readdir(path, (err, files) => {
    const htmlFiles = files.filter(f => f.match(/\.html$/))
    htmlFiles.forEach(f => purge(f))
  })
}

function purge(path) {
  fs.readFile(path, 'utf-8', (err, _data) => {
    console.log(path)
    const used = new Set(_data.match(/[^<>"'`\s]*[^<>"'`\s:]/g).map(x => x))
    console.log(used)
  })
}