const fs = require('fs')
const { join } = require('path')

const files = fs.readdirSync('dist')
const usedNames = getUsedNames()
files.forEach(f => {
  const path = join(__dirname, 'dist', f)
  purgeFile(path, usedNames)
})


function getUsedNames() {
  const names = new Set()
  const path = join(__dirname, './')
  const htmlFiles = fs.readdirSync(path).filter(f => f.match(/\.html$/))
  htmlFiles.forEach(f => {
    const data = fs.readFileSync(join(path, f), 'utf-8')
    const match = data.match(/[^<>"'`\s]*[^<>"'`\s:]/g).map(x => x)
    match.forEach(name => names.add(name))
  })
  return names
}

function purgeFile(path, usedNames) {
  const data = fs.readFileSync(path, 'utf-8')
  const arr = data.split('\n')
  const map = []
  arr.forEach((str, index) => {
    const cls = str.match(/^\s*[\w-:\.\\]+\s/)
    if (!cls) return
    const name = cls[0]
      .replace(/\s/g, '')
      .replace(/^\./, '')
      .replace(/\\/g, '')
      .replace(':focus', '')
      .replace(':hover', '')
      .replace(':active', '')
    map.push({ name, index })
  })

  map.forEach(({name, index}) => {
    if (!usedNames.has(name)) {
      arr[index] = ''
    }
  })
  const str = arr
    .filter(s => s)
    .join('\n')
    .replace(/@media.*\n\}/g, '')
    .replace(/\n+/g, '\n')
  fs.writeFileSync(path, str, 'utf-8')
}


