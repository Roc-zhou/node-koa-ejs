
const crypto = require("crypto");
const en_md5 = crypto.createHash("md5"); 

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
const md5 = str => en_md5.update(str).digest('hex')


module.exports = {
  getTemplateField,
  md5,
}