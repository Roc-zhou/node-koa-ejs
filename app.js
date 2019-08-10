const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const db = require('./util/sql')

const index = require('./routes/index')


// error handler
onerror(app)

db && (app.context.db = db) // ctx 原型 ctx.db()

app.use(logger()).
  use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  })).
  use(json()).
  use(require('koa-static')(__dirname + '/public')).
  use(views(__dirname + '/views', {
    extension: 'ejs'
  })).
  use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms ****************************************`)
  })
  
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
