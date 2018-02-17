const fs = require('fs')
const PathModule = require('path')
const pinyin = require('pinyin')

// 原小说文本分章节格式
// 第001章 --- 第1200章
const regex1 = /(\u7B2C\d+\u7AE0)/

const splitNovel = (pathToNovel = PathModule.resolve(__dirname, '../assets/novels/src/斗破苍穹.txt')) => {
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
    let arr = data.split(regex1)
    arr.forEach((v, i) => {
      if (i === 0) {
        writeChapter(`${desNovelPath}/pre.txt`, arr[i]).then(() => {
          console.log('前言（声明）分解完毕')
        })
      } else if (i % 2 === 1) {
        // 如果是奇数
        try {
          const chapterNumber = Number(arr[i].match(/\d+/g))
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

const writeChapter = (path = '', data = '') => {
  return new Promise((resolve, reject) => {
    if (!data) data = ''
    fs.writeFile(PathModule.resolve(path), data, (err, data) => {
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

splitNovel()

exports = {
  splitNovel
}
