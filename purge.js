const fs = require('fs')
const { join } = require('path')

const CODE_TYPE = 'utf-8'

const files = fs.readdirSync('dist')
const usedNames = getUsedNames()
files.forEach(f => {
  const path = join(__dirname, 'dist', f)
  const data = fs.readFileSync(path, CODE_TYPE)
  let str = purge(data, usedNames)
  str = mergeMedia(str)
  const p = join(__dirname, 'css', f)
  fs.writeFileSync(p, str, CODE_TYPE)
  console.log('write file ' + p)
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

// 抽离使用过的类
function purge(data, usedNames) {
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
  return str
}

// 合并 media query
function mergeMedia(data) {
  const arr = data.split('\n')
  const medias = Array.from(new Set(arr.filter(s => s.match(/^@media/))))
    .map(s => ({
      m: s,
      lines: []
    }))

  let lines = []
  let media = null
  arr.forEach(s => {
    if (s.match(/^@media/)) media = s
    else if (media && s !== '}') {
      const mediaLine = medias.find(m => m.m === media).lines
      mediaLine.push(s)
    } else if (s === '}') {
      media = null
    } else {
      lines.push(s)
    }
  })

  medias.forEach(m => {
    lines.push(m.m)
    lines = lines.concat(m.lines)
    lines.push('}')
  })
  
  const str = lines.join('\n')
  return str
}

