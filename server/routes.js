import fs from 'fs'
import path from 'path'
import asyncBusboy from 'async-busboy';
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
const uploadPic = async (ctx, next) => {
  const {files, fields} = await asyncBusboy(ctx.req);
  ctx.body = {status:200}
  console.log(files)
}

export default (app) => {
  router.get('/images', getImageNames);
  router.post('/uploadPic', uploadPic);
  return router.middleware()
}
