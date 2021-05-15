const fs = require('fs')
const { join } = require('path')

const CODE_TYPE = 'utf-8'

const files = fs.readdirSync('dist')
const usedNames = getUsedNames()
files.forEach(f => {
  purgeFile(f, usedNames)
})


function getUsedNames() {
  const names = new Set()
  const path = join(__dirname, './')
  const htmlFiles = fs.readdirSync(path).filter(f => f.match(/\.html$/))
  htmlFiles.forEach(f => {
    const data = fs.readFileSync(join(path, f), CODE_TYPE)
    const match = data.match(/[^<>"'`\s]*[^<>"'`\s:]/g).map(x => x)
    match.forEach(name => names.add(name))
  })
  return names
}

function getClassName(str) {
  const cls = str.match(/^\s*[\w-:\.\\%]+\s/)
  if (!cls) return null
  return cls[0]
    .replace(/\s/g, '')
    .replace(/^\./, '')
    .replace(/\\/g, '')
    .replace(':focus', '')
    .replace(':hover', '')
    .replace(':active', '')
}

function purgeFile(file, usedNames) {
  const path = join(__dirname, 'dist', file)
  const data = fs.readFileSync(path, CODE_TYPE)
  const arr = data.split('\n')
  arr.forEach((str, index) => {
    if (!str.match(/^\s*\./)) return
    const name = getClassName(str)
    if (name && !usedNames.has(name)) arr[index] = ''
  })

  const str = arr
    .filter(s => s)
    .join('\n')
    .replace(/@media.*\n\}/g, '')
    .replace(/\n+/g, '\n')
  fs.writeFileSync(join(__dirname, 'css', file), str, CODE_TYPE)
}


