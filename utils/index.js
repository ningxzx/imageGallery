import { curry, compose, replace, toLower } from 'ramda'

const addBlank = str => ' '+str
const capsToBlank = compose(addBlank,toLower)
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
    replace(/(?<=\w+)([A-Z])/g,capsToBlank),
    replace(/.*-([^-]+)\.\w+$/, '$1')
)

