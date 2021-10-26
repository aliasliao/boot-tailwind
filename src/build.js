/**
 * @param {string} src
 * */
const fs = require('fs')

function minify(src) {
  return src
    // handle tailwind functions
    .replaceAll(/theme\([^,]*,\s?([^)]+)\)/g, (_, p) => p)
    // handle comments
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    // handle new line
    .replaceAll(/[\r\n\s]/g, ' ')
    // handle continue space
    .replaceAll(/\s{2,}/g, ' ')
}

const file = process.argv[process.argv.length - 1]
if (!file.match(/\.css$/)) {
  console.error(`Usage: node ${process.argv[0]} <cssFilePath>`)
  process.exit(1)
}
const src = fs.readFileSync(file, "utf-8")
fs.writeFileSync(file, minify(src), "utf-8")
