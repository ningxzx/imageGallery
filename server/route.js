const fs = require('fs')
const path = require('path')

import  Router from 'koa-router'


const gallery = path.resolve(__dirname, '../gallery/');
const router = new Router()

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

router.get('/images', getImageNames);
export default router
