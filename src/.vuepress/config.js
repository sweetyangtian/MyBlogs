module.exports = {
  title: '小甜甜的博客',  // 设置网站标题
  description:'Welcome to my blogs',
  base:'/MyBlogs/',
  repo: 'https://github.com/sweetyangtian/MyBlogs', // 添加 github 链接
  dest:'./docs',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
      type: 'blog',
      author:'sweet',
      authorAvatar: '/avatar.jpg', // 首页头像
      valineConfig: {
        appId: 'ExCN5eeHkYsIeDET3bGwMwck-gzGzoHsz',
        appKey: 'PlVQo2WJyIyeqwzFK5b0hVo9'
      },
      friendLink: [ // 友情链接
          // {
          //   title: 'vuepress-theme-reco',
          //   desc: 'A simple and beautiful vuepress Blog & Doc theme.',
          //   logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
          //   link: 'https://vuepress-theme-reco.recoluan.com'
          // }
      ],
      nav: [
        // { text: '基础', link:'/basis/',sidebarDepth: 3 },
        {
          text: '开发', 
          icon:'reco-category',
          items: [
            { text: '开发规范', link: '/develop/' },
            { text: '工具函数', link: '/utils/' },
            { text: '开发工具', link: '/tools/' },
          ]
        },
        { 
          text: '移动端', 
          items: [
            { text: '移动端', link: '/mobile/' },
            { text: '微信小程序', link: '/wechat/' },
           
          ]
        },
      ],
      sidebar: {
        '/develop/': [
          ['', 'GIT规范'],
          ['css','CSS规范'],
          ['js','JS规范'],
          ['tools', '检查工具'],
          ['commit','代码提交检查']
        ],
        '/utils/':[
          ['', '常用校验'],
          ['exportAjax', '工具类']
        ],
        '/tools/':[
          ['', '在线工具'],
          ['git','Git'],
          ['svn','SVN'],
          ['nvmWindows','nvmWindows']
        ],
        '/wechat/':[
          ['', '入门须知'],
          ['taro', '爬坑'],
          ['dev', '常见业务场景'],
          ['share','网页生成图片'],
          
          
        ],
        '/mobile/':[
          ['','常见问题']
         
        ],
      }
  }

}