> 此文内容主要来源于互联网，本人只做了针对性的总结。

## 1、 JS模块化

众所周知，JavaScript由于历史的原因并没有模块的概念(ES6已经添加了模块的概念)，自从ajax带来了web2.0概念后，js代码已经和以前大不相同了，2009年HTML5兴起后，前端代码的行数已经呈现井喷式发展，随着代码量的增加，模块的缺失的缺点日益凸显，Javascript社区做了很多探索。

### 1.1 模块的定义
模块并非js语言独创，显然是借鉴其他语言的，下面是百度百科对模块的定义：
> 模块,又称构件,是能够"单独"命名并独立地完成一定功能的程序语句的"集合"（即程序代码和数据结构的集合体）

上面的提炼，再从其他语言的实现中借鉴下，总结起来，我们期待的模块有如下特性：
  - 独立性——能够独立完成一个功能，不受外部环境的影响
  - 完整性——完成一个特定功能
  - 集合性——一组语句的集合
  - 依赖性——可以依赖已经存在的模块
  - 被依赖——可以被其他模块依赖

其实我们想要的就是一个独立的模块，并能引用依赖，及被依赖。

C语言的库和头文件（include），java的包（import）。这在其他语言中都是原生支持的特性，在js中却是没有的(ES6中已经引入了import模块)。

### 2 模块的发展
#### 2.1 原始写法
##### 2.1.1 函数写法

    function m1(){
    　//...
    }

    function m2(){
    　//...
    }

只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

**使用：** m1()和m2()
**缺点** "污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

##### 2.1.2 对象写法
为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。


  var module1 = new Object({
  　count: 0,
  　m1 : function (){
  　　//...
  　},
  　m2 : function (){
  　　//...
  　}
  });


上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

    module1.m1();  

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

    module1.count = 5;

##### 2.1.3 立即执行函数写法

    var module1 = (function(){
    　var count = 0;
    　var m1 = function(){
    　　　//...
    　};
    　var m2 = function(){
    　　　//...
    　};
    　return {
    　　　m1 : m1,
    　　　m2 : m2
    　};
    })();

使用上面的写法，外部代码无法读取内部的_count变量。

    console.info(module1.count); //undefined

##### 2.1.4 放大模式    
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。

    var module1 = (function (mod){
    　mod.m3 = function () {
    　　　//...
    　};
    　return mod;
    })(module1);

> 上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

##### 2.1.5 宽放大模式（Loose augmentation）
在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。

    var module1 = ( function (mod){
    　//...
    　return mod;
    })(window.module1 || {});
与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

##### 2.1.6 输入全局变量
独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。   
为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

    var module1 = (function ($, YAHOO) {
    　//...
    })(jQuery, YAHOO);

上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

这方面更多的讨论，参见Ben Cherry的著名文章《[JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)》。

### 2.2 依赖注入
Martin Fowler 于 2004 年提出了依赖注入（Dependency Injection）的概念，其主要用于 Java 中的组件内通信, 2009 年 Misko Hevery 开始设计新的 JavaScript 框架 -- `Angular`，并且使用了依赖注入作为其组件间通信的核心机制。

Angular 允许我们定义模块，并且在显式地声明其依赖模块而由框架完成自动注入。其核心思想如下所示：

    // file greeting.js
    angular.module('greeter', [])
        .value('greeting', {
            helloInLang: {
                en: 'Hello world!',
                es: '¡Hola mundo!',
                ru: 'Привет мир!'
            },

            sayHello: function(lang) {
                return this.helloInLang[lang];
            }
        });

    // file app.js
    angular.module('app', ['greeter'])
        .controller('GreetingController', ['$scope', 'greeting', function($scope, greeting) {
            $scope.phrase = greeting.sayHello('en');
    }]);

之后在 Angular 2 与 Slot 之中依赖注入仍是核心机制之一，这也是 Angular 一系的更多的被视为大而全的框架而不是小而美的库的原因之一。

### 2.3 模块的规范 -- CommonJS规范 和 AMD规范
有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。

但是，这样做有一个前提，那就是大家必须以同样的方式编写模块,目前，通行的Javascript模块规范共有两种：[**CommonJS**](http://wiki.commonjs.org/wiki/Modules/1.1)和[**AMD**](https://github.com/amdjs/amdjs-api/wiki/AMD)。

#### 2.3.1 CommonJS
CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中。

这个项目最开始是由 Mozilla 的工程师 Kevin Dangoor 在2009年1月创建的，当时的名字是 ServerJS。

2009年8月，这个项目改名为 CommonJS，以显示其 API 的更广泛实用性。

CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。

该规范的主要内容是，
> 模块必须通过 module.exports 导出对外的变量或接口，

> 通过 require() 来导入其他模块的输出到当前模块作用域中。

    // moduleA.js
    module.exports = function( value ){
        return value * 2;
    }

    // moduleB.js
    var multiplyBy2 = require('./moduleA');
    var result = multiplyBy2(4);

CommonJS 是**同步加载模块**，但其实也有浏览器端的实现，其原理是现将所有模块都定义好并通过 id 索引，这样就可以方便的在浏览器环境中解析了，可以参考 [require1k](https://github.com/Stuk/require1k) 和 [tiny-browser-require](https://github.com/ruanyf/tiny-browser-require) 的源码来理解其解析（resolve）的过程。

重要应用 -- **nodeJs**

![](http://www.ruanyifeng.com/blogimg/asset/201210/bg2012103002.jpg)

node.js的**模块系统**，就是参照CommonJS规范实现的。

更多关于 CommonJS 规范的内容请查看 [http://wiki.commonjs.org/wiki/CommonJS](http://wiki.commonjs.org/wiki/CommonJS)。

#### 2.3.2 AMD 规范

AMD（异步模块定义）是为浏览器环境设计的，因为 CommonJS 模块系统是同步加载的，当前浏览器环境还没有准备好同步加载模块的条件。

AMD 定义了一套 JavaScript 模块依赖异步加载标准，来解决同步加载的问题。

模块通过 **define** 函数定义在**闭包**中，格式如下：

    define(id?: String, dependencies?: String[],
      actory: Function|Object);

**参数解释**
  - id 是模块的名字，它是可选的参数。
  - dependencies 指定了所要依赖的模块列表，它是一个数组，也是可选的参数。

    每个依赖的模块的输出将作为参数一次传入 factory 中。如果没有指定 dependencies，那么它的默认值是 ["require", "exports", "module"]。
  - factory 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值。

**一些用例：**
定义一个名为 myModule 的模块，它依赖 jQuery 模块：


      define('myModule', ['jquery'], function($) {
          // $ 是 jquery 模块的输出
          $('body').text('hello world');
      });
      // 使用
      require(['myModule'], function(myModule) {});


**注意**

- 定义一个没有 id 值的匿名模块，通常作为应用的启动函数：

        define(['jquery'], function($) {
            $('body').text('hello world');
        });

- 依赖多个模块的定义：

        define(['jquery', './math.js'], function($, math) {
          // $ 和 math 一次传入 factory
          $('body').text('hello world');
        });

- 模块输出：


        define(['jquery'], function($) {
          var HelloWorldize = function(selector){
              $(selector).text('hello world');
          };

          // HelloWorldize 是该模块输出的对外接口
          return HelloWorldize;
        });


- 在模块定义内部引用依赖：

        define(function(require) {
          var $ = require('jquery');
          $('body').text('hello world');
        });

### 2.4 UMD
AMD 与 CommonJS 虽然师出同源，但还是分道扬镳.
- 关注于代码异步加载与最小化入口模块的开发者将目光投注于 AMD；
- 随着 Node.js 以及 Browserify 的流行，越来越多的开发者也接受了 CommonJS 规范。

对于需要同时支持 AMD 和 CommonJS 的模块而言，可以使用 UMD（Universal Module Definition）。

    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
          // AMD
        define(['myModule', 'myOtherModule'], factory);
      } else if (typeof exports === 'object') {
          // CommonJS
        module.exports = factory(require('myModule'), require('myOtherModule'));
      } else {
        // Browser globals (Note: root is window)
        root.returnExports = factory(root.myModule, root.myOtherModule);
      }
    }(this, function (myModule, myOtherModule) {
      // Methods
      function notHelloOrGoodbye(){}; // A private method
      function hello(){}; // A public method because it's returned (see below)
      function goodbye(){}; // A public method because it's returned (see below)

      // Exposed public methods
      return {
          hello: hello,
          goodbye: goodbye
      }
    }));

在执行UMD规范时，会优先判断是当前环境是否支持AMD环境，然后再检验是否支持CommonJS环境，否则认为当前环境为浏览器环境（window）。

如果你写了一个小工具库，你想让它及支持AMD规范，又想让他支持CommonJS规范，那么采用UMD规范对你的代码进行包装吧。

### 2.5 ES6 模块
无论是 AMD 还是 CommonJS，这些都是 JavaScript 函数来模拟的。

ES6 开始引入了原生的模块功能。

ES6 的原生模块功能非常棒，它兼顾了规范、语法简约性和异步加载功能。它还支持循环依赖。

**import** 进来的模块对于调用它的模块来是说是一个活的只读视图，而不是像 CommonJS 一样是一个内存的拷贝。

下面是一个 ES6 模块的示例：

    // lib/counter.js
    export let counter = 1;

    export function increment() {
      counter++;
    }

    export function decrement() {
      counter--;
    }


    // src/main.js
    import * as counter from '../../counter';

    console.log(counter.counter); // 1
    counter.increment();
    console.log(counter.counter); // 2

如果只希望导出某个模块的部分属性，或者希望处理命名冲突的问题，可以有这样一些导入方式：

    import {detectCats} from "kittydar.js";

    //or
    import {detectCats, Kittydar} from "kittydar.js";

    //or
    import {flip as flipOmelet} from "eggs.js";
    import {flip as flipHouse} from "real-estate.js";

**什么时候可以使用ES6模块**

> 现在就可以用！

如果你现在就想在项目中加入新的模块语法，你需要使用 Babel 或 Traceur 这样的转译器。

## 总结
1. 模块化的发展：
    - 原始写法
        - 函数写法
        - 对象写法
        - 立即执行函数写法
        - 放大模式
        - 宽放大模式
        - 输入全局变量
    - 依赖注入
    - CommonJS
    - AMD
    - UMD
    - ES6 模块
2. 模块的规范
    - CommonJS规范
    - AMD规范


## 参考文章
- [JavaScript 模块演化简史](https://zhuanlan.zhihu.com/p/26231889)
- [JavaScript模块的前世今生](http://yanhaijing.com/javascript/2015/03/28/js-module/)
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [【第905期】JavaScript 模块演化简史](https://mp.weixin.qq.com/s/3eiK4liZY_BvncNqyLTgnA)
- [CommonJS 规范](http://zhaoda.net/webpack-handbook/commonjs.html)
