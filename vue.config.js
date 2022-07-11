const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  devServer:{
    open: true,
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://1.116.64.64:5004/api2',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
          // 配置出来的接口没有 /api
          // 比如/api/admin/being/classes/classInfo 会被替代成/admin/being/classes/classInfo
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
})
