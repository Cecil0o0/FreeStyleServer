const fs = require('fs')
const PathModule = require('path')
const pinyin = require('pinyin')
const nzhcn = require("nzh/cn")

// 原小说文本分章节格式
// 第001章 --- 第1200章
const regex1 = /(\u7B2C\d+\u7AE0)/
// 第一章 ....（三） --- 第二百三十六章 ...
const regex2 = /(\u7B2C[\s\S]{1,5}\u7AE0)/

const splitNovel = (pathToNovel = PathModule.resolve(__dirname, '../assets/novels/src/斗罗大陆.txt')) => {
  return new Promise((resolve, reject) => {
    if (!pathToNovel) { reject('invalid path') }
    // 文件路径
    const filepath = PathModule.resolve(pathToNovel)
    // 文件目录
    const fileDirname = PathModule.dirname(pathToNovel)
    // 文件名称
    const novelName = PathModule.parse(pathToNovel).name || ''
    // 文件拼音
    const novelPinyin = pinyin(novelName, {
      style: pinyin.STYLE_FIRST_LETTER
    }).join('')
    // 分解文件目录
    const splitedDirname = PathModule.resolve(fileDirname, '../des', novelPinyin)
    // 创建分解文件目录
    if (fs.existsSync(splitedDirname)) {
      rmdir(splitedDirname)
      splitChapter(filepath, splitedDirname)
    } else {
      mkdir(splitedDirname).then(() => {
        splitChapter(filepath, splitedDirname)
      }, err => {
        console.log(err)
      })
    }
  })
}

const splitChapter = (srcNovelPath, desNovelPath) => {
  fs.readFile(srcNovelPath, {
    encoding: 'utf8'
  }, (err, data) => {
    let arr = data.split(regex2)
    arr.forEach((v, i) => {
      if (i === 0) {
        writeChapter(`${desNovelPath}/pre.txt`, arr[i]).then(() => {
          console.log('前言（声明）分解完毕')
        })
      } else if (i % 2 === 1) {
        // 如果是奇数
        try {
          let chapterNumber = 0
          // 如果中间是数字，则直接使用
          if (arr[i].match(/\d+/g)) {
            chapterNumber = Number(arr[i].match(/\d+/))
            // 否则转成数字
          } else {
            let str = arr[i].match(/\u7B2C([\s\S]{1,5})\u7AE0/)[1]
            chapterNumber = Number(nzhcn.decodeS(str))
          }
          const name = chapterNumber + '.txt'
          const content = `第${chapterNumber}章：${arr[i+1]}`
          writeChapter(`${desNovelPath}/${name}`, content).then(() => {
            console.log(`第${chapterNumber}章已成功保存！`)
          })
        } catch (e) {
          console.log(`转换失败章节索引为(${i})值为(${arr[i]})`)
        }
      }
    })
  })
}

const writeChapter = (path = '', data = '', options = { flag: 'a' }) => {
  return new Promise((resolve, reject) => {
    if (!data) data = ''
    fs.writeFile(PathModule.resolve(path), data, options, (err, data) => {
      if (err) reject(err)
      resolve()
    })
  })
}

const mkdir = path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const rmdir = path => {
  fs.readdir(path, (err, files) => {
    files.forEach(filename => {
      fs.unlinkSync(PathModule.resolve(path, filename))
    })
  })
}

splitNovel()

exports = {
  splitNovel
}
