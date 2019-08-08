const router = require('koa-router')()
const { getTemplateField } = require('../util/common')

router.get('/', async (ctx, next) => {
  await ctx.render('home', getTemplateField(ctx))
})

router.get('/about', async (ctx, next) => {
  await ctx.render('about', getTemplateField(ctx, '关于我'))
})

module.exports = router
