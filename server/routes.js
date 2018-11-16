const fs = require('fs')
const path = require('path')


import Router from 'koa-trie-router'

const router = new Router()

const gallery = path.resolve(__dirname, '../gallery/');

const getImageNames = async function (ctx, next) {
  await next()
  let files = []
  await new Promise((resolve, reject) => { // 读image文件夹
    fs.readdir(gallery, function (err, picFiles) {
      if (err) ctx.throw(err)
      files = picFiles
      resolve()
    })
  })
  ctx.body = files
}
//TODO: 文件夹递归查询

export default (app) => {
  router.get('/images', getImageNames);
  return router.middleware()
}
