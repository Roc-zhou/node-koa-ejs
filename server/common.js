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

module.exports = {
  getTemplateField,
}