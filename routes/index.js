const router = require('koa-router')()
const { getTemplateField, md5, randomString } = require('../util/common')
const jwt = require('jsonwebtoken')
const { KEY } = require('../util/constant')

router.get('/', async (ctx, next) => {
  // await ctx.response.redirect('/login') // 重定向操作
  await ctx.render('login', {
    ...getTemplateField(ctx, '登录'),
    errorText: ''
  })
})

router.get('/home', async (ctx, next) => {
  await ctx.render('home', getTemplateField(ctx))
})

router.get('/about', async (ctx, next) => {
  await ctx.render('about', getTemplateField(ctx, '关于我'))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getTemplateField(ctx, '注册'))
})

router.post('/register', async (ctx, next) => {
  const { userName, userPwd } = ctx.request.body

  console.log(userName, userPwd);

})

router.post('/login', async (ctx, next) => {
  const { name, password } = ctx.request.body

})



module.exports = router
