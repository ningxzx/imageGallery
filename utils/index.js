import { curry, compose, replace, toLower } from 'ramda'
import imageCompression from "browser-image-compression";

const addBlank = str => ' '+str
/**
 * 解析图片名称
 * @param {*} imgName 图片名称
 * 上传时也按照这个规则来组织
 * 文件名称为英文，上传时可传中文和英文
 * 实际文件名：日期-地点-名字，以驼峰命名.(jpeg/png/gif) e.g. 20181120-botswana-littleElephant.jpg
 * 上传文件名：英文以空格连接单词；e.g. little elephant
 * 页面显示：优先中文，英文驼峰转空格
 */
export const getImageName = compose(
    toLower,
    replace(/(?<=\w+)([A-Z])/g,addBlank),
    replace(/(.*-)?([^-]+)\.\w+$/, '$2')
)

export function compressImage(event) {
 
  var imageFile = event.target.files[0];
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
 
  var maxSizeMB = 1;
  var maxWidthOrHeight = 1920; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
  imageCompression(imageFile, maxSizeMB, maxWidthOrHeight) // maxSizeMB, maxWidthOrHeight are optional
    .then(function (compressedFile) {
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
 
      return uploadToServer(compressedFile); // write your own logic
    })
    .catch(function (error) {
      console.log(error.message);
    });
}