const PathModule = require('path')
const novelPath = PathModule.resolve('src/assets/novels')
const fs = require('fs')

const novel = (router) => {
  router.get('/novels/:name/:id', async ctx => {
    const { name, id } = ctx.params
    const pathToNovel = `${novelPath}/des/${name}/${id}.txt`
    await new Promise((resolve, reject) => {
      fs.readFile(pathToNovel, async (err, data) => {
        await ctx.render('novel/index', {
          title: '清风小说',
          baseURL: `${router.opts.prefix}/novels`,
          novel: {
            id,
            name
          },
          content: data
        })
        resolve()
      })
    })
  })
}

module.exports = novel
