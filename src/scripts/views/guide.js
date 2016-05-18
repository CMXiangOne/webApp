var guideTpl = require('../tpl/guide.string');

SPA.defineView('guide', {
  html: guideTpl,

  // 插件列表
  plugins: [
    'delegated'
  ],

  // 给模板绑定事件
  bindActions: {
    'goto.index': function () {
      // 进入index视图
      SPA.open('index');
    }
  },

  // 给视图绑定事件
  bindEvents: {
    // 在试图还没有打开的时候触发
    beforeShow: function () {
      // swiper
      var mySwiper = new Swiper('#guide-swiper', {
        loop: false
      });
    }
  }
});
