const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import middlewares from './middlewares'
import serve from 'koa-static'
import path from 'path'


const app = new Koa()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // access to local file
  const gallery = path.resolve(__dirname,  "../gallery");
  app.use(serve(gallery))


  // Middlewares are imported here.
  middlewares(app)

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
