const fs = require('fs')

/**
 * @param {string} src
 * @return {string}
 * */
function minify(src) {
  return src
    // handle tailwind functions
    .replaceAll(/theme\([^,]*,\s?([^)]+)\)/g, (_, p) => p)
    // handle comments
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    // handle tailing space
    .replaceAll(/[ ]+\n/g, '\n')
    // handle consecutive new line
    .replaceAll(/[\r\n]{2,}/g, '\n')
    // handle starting new line
    .replaceAll(/^[\r\n]*/g, '')
}

const file = process.argv[process.argv.length - 1]
if (!file.match(/\.css$/)) {
  console.error(`Usage: node ${process.argv[0]} <cssFilePath>`)
  process.exit(1)
}
const src = fs.readFileSync(file, "utf-8")
fs.writeFileSync(file, minify(src), "utf-8")
