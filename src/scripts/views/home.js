// 引入模板
var homeTpl = require('../tpl/home.string');

// 定义一个视图
SPA.defineView('home', {
  // 将模板写在body里
  html: homeTpl,

  plugins: [
    'delegated'
  ],
init:{

	  // 定义视图公共的home swiper对象
    myHomeSwiper: null	
},
  bindEvents: {
  	 beforeShow: function () {
  	 	var that =this;
  	 	 // 定义home swiper，注意这里的that.mySwiper
      that.myHomeSwiper = new Swiper('#home-swiper', {
         direction: 'horizontal',
    	 loop: true,
    	 autoplay: 4000
      });

  	 }
  }
});























