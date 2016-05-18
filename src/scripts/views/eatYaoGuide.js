// 引入模板
var eatYaoGuideTpl = require('../tpl/eatYaoGuide.string');

// 定义一个视图
SPA.defineView('eatYaoGuide', {
  // 将模板写在body里
  html: eatYaoGuideTpl,

  plugins: [
    'delegated',
    {
    	name:"avalon",
    	options:function (vm) {
    		vm.homeList =[];
    	}
    }

  ],

  // 给视图定义公共的属性和方法
  init: {    // 定义scroll对象
    myScroll: null
  },

  bindEvents: {
  	 beforeShow: function () {
  	// 保存视图对象
      var that = this;

      // 获得avalon的vm
      var vm = that.getVM();
      var gapSize = 30;
      // 渲染数据
      $.ajax({
        url: '/api/homeList.php',
        success: function (res) {
         setTimeout(function () {
            // 第一次渲染数据
            vm.homeList = res.data;
            // vm.isShowLoading = false;
            that.myScroll.scrollBy(0, -gapSize);
          }, 100);
        }
      });

         // 下拉刷新，上拉加载
      // 使scroll pullToRefresh 滞后执行
      setTimeout(function () {
        // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
        that.myScroll = that.widgets.homeHotScroll;
        that.myScroll.scrollBy(0, -gapSize);
        var head = $('.head img'),
            topImgHasClass = head.hasClass('up');
        var foot = $('.foot img'),
            bottomImgHasClass = head.hasClass('down');
        that.myScroll.on('scroll', function () {
            var y = this.y;
                maxY = this.maxScrollY - y;
            if (y >= 0) {
                !topImgHasClass && head.addClass('up');
                return '';
            }
            if (maxY >= 0) {
                !bottomImgHasClass && foot.addClass('down');
                return '';
            }
        });

        that.myScroll.on('scrollEnd', function () {
            if (this.y >= -100 && this.y < 0) {
                that.myScroll.scrollTo(0, -gapSize);
                head.removeClass('up');
            } else if (this.y >= 0) {
                head.attr('src', '/webapp1502/images/ajax-loader.gif');
                // ajax下拉刷新数据
                   $.ajax({
                  url: '/api/homeList.php',
                  data: {
                    type: 'refresh'
                  },
                  success: function (res) {
                    console.log(res.data);
                    vm.homeList = res.data.concat(vm.homeList.$model);
                    
                    console.log(vm.homeList)
                    that.myScroll.scrollTo(0, -gapSize);
                    head.removeClass('up');
                    head.attr('src', '/webapp1502/images/arrow.png');
                  }
                });

            }

            var maxY = this.maxScrollY - this.y;
            var self = this;
            if (maxY > -gapSize && maxY < 0) {
                
                that.myScroll.scrollTo(0, self.maxScrollY + gapSize);
                foot.removeClass('down')
            } else if (maxY >= 0) {
                foot.attr('src', '/webapp1502/images/ajax-loader.gif');
                // ajax上拉加载数据
                $.ajax({
                  url: '/api/homeList.php',

                  // 请求参数，get：放置的url上，post:request体里
                  data: {
                    type: "more"
                    
                  },

                  success: function (res) {
                    vm.homeList = vm.homeList.pushArray(res.data);
                   // vm.homeList = that.formatArray(vm.homeTempList.$model);
              
                     //that.homeList = that.homeList.concat(res.data);
                    // vm.homeList = that.formatArray(that.homeTempList.concat(res.data));
                    // scroll 列表刷新
                    that.myScroll.refresh();
                    that.myScroll.scrollTo(0, self.y + gapSize);
                    foot.removeClass('down');
                    foot.attr('src', '/webapp1502/images/arrow.png');

                  }
                })

            
            }
        });
      }, 0);

 	 }
	}
});
