require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');

// require views
require('./views/guide.js');
require('./views/my.js');
require('./views/index.js');
require('./views/home.js');
require('./views/commonZiXun.js');
require('./views/eatYaoGuide.js');
require('./views/ganDanNews.js');
// 定义默认视图
SPA.config({
  indexView: 'guide'
});
