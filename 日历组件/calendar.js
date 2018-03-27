(function(window,document){
  function Calendar(options){
    //传入配置的中的参数
    this.init();
  }

  Calendar.prototype = {
    init : function(){
      this.createDom();
      this.loadCss();
      this.cacheDom();
      this.bindEvents();
      this.render();
    },
    loadCss:function(){
       // 把组件所需的样式表动态加载进来
    },
    createDom:function(){
       // 创建dom对象或者创建html片段或者创建template
    },
    cacheDom:function(){
       // 存储dom 对象
    },
    bindEvents:function(){
       //事件绑定
    },
    render:function(){
      //渲染函数，更新数据或样式
    }
  }

}(window,document))
