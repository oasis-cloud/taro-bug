export default defineAppConfig({
  pages: [
    'pages/index/index', 
    'pages/home/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页'
    }, {
      pagePath: 'pages/mine/index',
      text: '我的'
    }],
    color: '#222',
    selectedColor: '#1376fe',
    backgroundColor: '#fff',
    borderStyle: 'black'
  }
});