const router = require('koa-router')()
const { getTemplateField, md5, randomString } = require('../util/common')
const jwt = require('jsonwebtoken')
const { KEY } = require('../util/constant')

router.get('/', async (ctx, next) => {
  // await ctx.response.redirect('/login') // 重定向操作
  await ctx.render('login', getTemplateField(ctx, '登录'))
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

  if (!userName) return ctx.render('errorWar', {
    ...getTemplateField(ctx, '错误提示'),
    errorText: '用户名不能为空'
  })
  if (!userPwd) return ctx.render('errorWar', {
    ...getTemplateField(ctx, '错误提示'),
    errorText: '密码不能为空'
  })

  // 查找是否已存在数据
  const s1 = `SELECT name from user WHERE name = ?`,
    d1 = await ctx.db(s1, [userName]),
    andomStr = randomString()
  if (d1.length === 0) {
    // 插入用户
    const in1 = `INSERT INTO user (name,slot_code,password,create_time) VALUES (?,?,?,?)`,
      insterResult = await ctx.db(in1, [userName, andomStr, md5(userPwd + andomStr), $dealDate(new Date())])
    if (insterResult === 'error') {
      return ctx.render('errorWar', {
        ...getTemplateField(ctx, '错误提示'),
        errorText: '服务异常'
      })
    }
    return ctx.render('login', getTemplateField(ctx, '登录'))
  } else {
    return ctx.render('errorWar', {
      ...getTemplateField(ctx, '错误提示'),
      errorText: '用户已注册'
    })
  }




})

router.post('/login', async (ctx, next) => {
  const { name, password } = ctx.request.body

})

const $dealDate = date => {
  if (date === undefined || date === null) {
    return null
  }
  date = new Date(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  h = h < 10 ? ("0" + h) : h;
  m1 = m1 < 10 ? ("0" + m1) : m1;
  s = s < 10 ? ('0' + s) : s;
  return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s;
}



module.exports = router
