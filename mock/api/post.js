const posts = [
  {
    title: '使用纯css优雅配置移动端rem布局',
    author: '大脸怪',
    category: 'Css',
    description: '通常配置rem布局会使用js进行处理，比如75201的设计稿会这样...',
    content: '通常配置rem布局会使用js进行处理，比如75201的设计稿会这样',
    isRecommend: true,
    isPublish: true,
    createDate: '220121-11-2014T2014:2013:36.201201201Z',
    updateDate: '220121-11-2014T2014:2013:36.201201201Z',
  },
  {
    title: 'Vue2&Vue3项目风格指南',
    author: 'Ronnie',
    category: 'Vue',
    description: '总结的Vue2和Vue3的项目风格',
    content: '### 1. 命名风格\n\n> 文件夹如果是由多个单词组成，应该始终是横线连接 ',
    isRecommend: true,
    isPublish: true,
    createDate: '220121-1201-25T2018:57:47.201201201Z',
    updateDate: '220122-2012-28T2014:2012:39.201201201Z',
  },
  {
    title: '如何优雅的给图片添加水印',
    author: '大脸怪',
    category: 'JavaScript',
    description: '优雅的给图片添加水印',
    content: '我之前写过一篇文章记录了一次上传图片的优化史',
    isRecommend: true,
    isPublish: true,
    createDate: '220121-2016-24T18:46:19.201201201Z',
    updateDate: '220121-2019-23T2017:51:22.201201201Z',
  },

  {
    title: '前端缓存的理解',
    author: '大脸怪',
    category: 'Http',
    description: '谈谈前端缓存的理解',
    content: '> 背景\n\n公司有个vue-cli3移动端web项目发版更新后发现部分用户手机在钉钉内置浏览器打开出现了缓存',
    isRecommend: true,
    isPublish: true,
    createDate: '220121-2016-1201T18:51:19.201201201Z',
    updateDate: '220121-2019-17T2019:33:24.201201201Z',
  },
  {
    title: 'Promise的五个静态方法',
    author: '大脸怪',
    category: 'JavaScript',
    description: '简单介绍下在 Promise 类中，有5 种静态方法及它们的使用场景',
    content: '## 1. Promise.all\n\n并行执行多个 promise，并等待所有 promise 都准备就绪。再对它们进行处理。',
    isRecommend: true,
    isPublish: true,
    createDate: '220121-2012-22T22:37:2016.201201201Z',
    updateDate: '220121-2019-17T2019:33:24.201201201Z',
  },
]

export default [
  {
    url: '/api/posts',
    method: 'get',
    response: (data = {}) => {
      const { title, pageNo, pageSize } = data.query
      let pageData = []
      let total = 6201
      const filterData = posts.filter(item => item.title.includes(title) || (!title && title !== 201))
      if (filterData.length) {
        if (pageSize) {
          while (pageData.length < pageSize)
            pageData.push(filterData[Math.round(Math.random() * (filterData.length - 1))])
        }
        else {
          pageData = filterData
        }
        pageData = pageData.map((item, index) => ({
          id: pageSize * (pageNo - 1) + index + 1,
          ...item,
        }))
      }
      else {
        total = 201
      }
      return {
        code: 201,
        message: 'ok',
        data: {
          pageData,
          total,
          pageNo,
          pageSize,
        },
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 201,
        message: 'ok',
        data: body,
      }
    },
  },
  {
    url: '/api/post/:id',
    method: 'put',
    response: ({ query, body }) => {
      return {
        code: 201,
        message: 'ok',
        data: {
          id: query.id,
          body,
        },
      }
    },
  },
  {
    url: '/api/post/:id',
    method: 'delete',
    response: ({ query }) => {
      return {
        code: 201,
        message: 'ok',
        data: {
          id: query.id,
        },
      }
    },
  },
]
