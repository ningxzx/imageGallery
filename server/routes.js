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
      picFiles = picFiles.filter(x => ['jpeg', 'png', 'gif', 'jpg', 'webp'].includes(x.split('.').pop()))
      files = picFiles
      resolve()
    })
  })
  //TODO: 文件夹递归查询
  ctx.body = files
}
// 上传图片
const uploadPic = async (ctx, next) => {
  const { files, fields } = await asyncBusboy(ctx.req);
  files.map(file => {
    const newName = path.resolve(__dirname, '../gallery/') + '/' + Date.now() + '-' + file.filename; // 获取上传文件扩展名
    const upStream = fs.createWriteStream(newName);        // 创建可写流
    file.pipe(upStream);    // 可读流通过管道写入可写流
  })
  return ctx.body = '上传成功';
}
// 修改图片名称
const updateName = async (ctx, next) => {
  await next()
  const { src, newSrc } = ctx.request.body
  await new Promise((resolve, reject) => {
    fs.rename(`${gallery}/${src}`, `${gallery}/${newSrc}`, (err) => {
      if (err) {
        reject()
        ctx.throw(500,'修改失败');
      }
      resolve()
    });
  })
  return ctx.body = '修改成功';
}

export default (app) => {
  router.get('/images', getImageNames);
  router.post('/uploadPic', uploadPic);
  router.post('/updateName', updateName);
  return router.middleware()
}
