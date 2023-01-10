import path from 'path'

const config = {
  projectName: 'taro-app',
  date: '2022-10-8',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/common': path.resolve(__dirname, '..', 'src/common'),
    '@/apis': path.resolve(__dirname, '..', 'src/apis'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/redux': path.resolve(__dirname, '..', 'src/redux'),
  },
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/assets/style/nutui.scss'),
      path.resolve(__dirname, '..', 'src/app.scss'),
    ],
    data: '@import "@nutui/nutui-react-taro/dist/styles/variables.scss";',
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    ['@tarojs/plugin-html'],
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  framework: 'react',
  compiler: 'webpack5',
  isWatch: true,
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    hot: false,
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      pxtransform: {
        enable: true,
        // config: {
        //   selectorBlackList: ['nut-'],
        // },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
}

module.exports = (merge) => {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
