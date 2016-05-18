// 引入模板
var commonZiXunTpl = require('../tpl/commonZiXun.string');

// 定义一个视图
SPA.defineView('commonZiXun', {
  // 将模板写在body里
  html: commonZiXunTpl,

  plugins: [
    'delegated'
  ],

  bindActions: {

  }
});