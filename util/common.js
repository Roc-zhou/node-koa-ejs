
const crypto = require("crypto");

const getTemplateField = ({ originalUrl: path, }, title = 'Roc_zhou', date = new Date()) => ({
  path,
  title,
  author: 'Roc_zhou',
  keywords: [
    'Roc_zhou',
    '前端',
    'Vue',
    'React',
    'JavaScript',
  ],
  description: 'Roc_zhou', // 描述
})
const md5 = str => crypto.createHash("md5").update(str).digest('hex')

const randomString = (len = 8) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  return pwd
}

module.exports = {
  getTemplateField,
  md5,
  randomString
}