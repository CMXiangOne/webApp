// 引入模板
var ganDanNewsTpl = require('../tpl/ganDanNews.string');

// 定义一个视图
SPA.defineView('ganDanNews', {
  // 将模板写在body里
  html: ganDanNewsTpl,

  plugins: [
    'delegated',
     {
      name:"avalon",
      options:function (vm) {
        vm.ganDanList =[];
      }
    }


  ],
init:{

	  // 定义视图公共的home swiper对象
    myNewSwiper: null,
    myGanDanScroll: null

},
  bindEvents: {
  	 beforeShow: function () {
  	 	var that =this;
  	 	 // 定义home swiper，注意这里的that.mySwiper
      that.myNewSwiper = new Swiper('#news-swiper', {
         direction: 'horizontal',
    	 loop: true,
    	 autoplay: 4000
      });
   // 保存视图对象
      // 获得avalon的vm
      var vm = that.getVM();
      var gapSizeNews = 30;
      // 渲染数据
      $.ajax({
        url: '/api/ganDanList.php',
        success: function (res) {
         setTimeout(function () {
            // 第一次渲染数据
            vm.ganDanList = res.data;
            // vm.isShowLoading = false;
            that.myScroll.scrollBy(0, -gapSizeNews);
          }, 100);
        }
      });

         // 下拉刷新，上拉加载
      // 使scroll pullToRefresh 滞后执行
      setTimeout(function () {
        // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
        that.myScroll = that.widgets.ganDanScroll;
        that.myScroll.scrollBy(0, -gapSizeNews);
        var head1 = $('.head1 img'),topImgHasClass1 = head1.hasClass('up');
        var foot1 = $('.foot1 img'),bottomImgHasClass1 = head1.hasClass('down');
        that.myScroll.on('scroll', function () {
            var y = this.y;
                maxY = this.maxScrollY - y;
            if (y >= 0) {
                !topImgHasClass1 && head1.addClass('up');
                return '';
            }
            if (maxY >= 0) {
                !bottomImgHasClass1 && foot1.addClass('down');
                return '';
            }
        });

        that.myScroll.on('scrollEnd', function () {
            if (this.y >= -100 && this.y < 0) {
                that.myScroll.scrollTo(0, -gapSizeNews);
                head1.removeClass('up');
            } else if (this.y >= 0) {
                head1.attr('src', '/webapp1502/images/ajax-loader.gif');
                // ajax下拉刷新数据
                   $.ajax({
                  url: '/api/ganDanList.php',
                  data: {
                    type: 'reflesh'
                  },
                  success: function (res) {
                   
                    vm.ganDanList = res.data.concat(vm.ganDanList.$model);
                    
                    
                    that.myScroll.scrollTo(0, -gapSizeNews);
                    head1.removeClass('up');
                    head1.attr('src', '/webapp1502/images/arrow.png');
                  }
                });

            }

            var maxY = this.maxScrollY - this.y;
            var self1 = this;
            if (maxY > -gapSizeNews && maxY < 0) {
                
                that.myScroll.scrollTo(0, self1.maxScrollY + gapSizeNews);
                foot1.removeClass('down')
            } else if (maxY >= 0) {
                foot1.attr('src', '/webapp1502/images/ajax-loader.gif');
                // ajax上拉加载数据
                $.ajax({
                  url: '/api/ganDanList.php',

                  // 请求参数，get：放置的url上，post:request体里
                  data: {
                    type: "more"
                    
                  },

                  success: function (res) {
                    vm.ganDanList = vm.ganDanList.pushArray(res.data);
                   // vm.homeList = that.formatArray(vm.homeTempList.$model);
              
                     //that.homeList = that.homeList.concat(res.data);
                    // vm.homeList = that.formatArray(that.homeTempList.concat(res.data));
                    // scroll 列表刷新
                    that.myScroll.refresh();
                    that.myScroll.scrollTo(0, self1.y + gapSizeNews);
                    foot1.removeClass('down');
                    foot1.attr('src', '/webapp1502/images/arrow.png');

                  }
                })

            
            }
        });
      }, 0);
  	 }
  
  }
});