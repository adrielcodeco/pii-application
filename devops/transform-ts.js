const crypto = require('crypto')
const path = require('path')
const ts = require('typescript')

const tsconfig = require.resolve('../tsconfig.json')

function getCacheKey (
  fileData,
  filename,
  configString,
  { instrument, rootDir }
) {
  return crypto
    .createHash('md5')
    .update(fileData)
    .update('\0', 'utf8')
    .update(path.relative(rootDir, filename))
    .update('\0', 'utf8')
    .update(configString)
    .update('\0', 'utf8')
    .update(filename)
    .update('\0', 'utf8')
    .update(instrument ? 'instrument' : '')
    .digest('hex')
}

function process (src, filename, config, transformOptions) {
  const transpileOutput = ts.transpileModule(src, {
    compilerOptions: tsconfig,
    fileName: filename
  })
  return {
    code: transpileOutput.outputText || src,
    map: transpileOutput.sourceMapText
  }
}

module.exports = {
  canInstrument: true,
  getCacheKey,
  process
}
