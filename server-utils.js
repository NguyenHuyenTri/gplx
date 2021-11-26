const path = require('path')
const fs = require('fs')
let cachedBuildFile

export const readBuildFile = async function () {
  const filePath = path.resolve(__dirname, './build', 'index.html')
  if (cachedBuildFile) {
    return cachedBuildFile
  }
  const indexFileData = fs.readFileSync(filePath, 'utf8')
  cachedBuildFile = indexFileData
  return cachedBuildFile
}
