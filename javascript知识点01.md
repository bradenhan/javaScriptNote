## javascript 知识点
### async与defer
	- 异步(async) 脚本将在其加载完成后立即执行
	- 延迟(defer) 脚本将等待 HTML 解析完成后，并按加载顺序执行。
	
	如果一个script加了defer属性，即使放在head里面，它也会在html页面解析完毕之后再去执行，也就是类似于把这个script放在了页面底部。
	
	对于async，这个是html5中新增的属性，它的作用是能够异步的加载和执行脚本，不因为加载脚本而阻塞页面的加载。一旦加载到就会立刻执行。
	
	async属性的情况，和defer一样，等待的资源不会阻塞其余资源的加载，也不会影响页面的加载。
	
	##### 注意：
	在有async的情况下，js一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果js前后有依赖性，用async，就很有可能出错。
	
	### defer和async的区别
	- 相同点：
	  - 加载文件时不阻塞页面渲染
	  - 对于inline的script无效
	  - 使用这两个属性的脚本中不能调用document.write方法
	  - 有脚本的onload的事件回调
	  
   - 区别点：
	 - html的版本html4.0中定义了defer；html5.0中定义了async
	 - 浏览器
	
|  Feature	| Chrome	| Firefox (Gecko)	|  Internet Explorer	|  Opera | 	Safari	| 
| ------| ------ | ------ | ------ | ------ | ------ |
| Basic | support	1.0	|  1.0 (1.7 or earlier)	|  (Supported)| 	(Supported) |  (Supported)| 
| async attribute	| (Supported)	| 3.6 (1.9.2)| 	10	| —| 	(Supported) | 
| defer attribute | 	(Supported)| 	3.5 (1.9.1)	 |   4| 	—| 	(Supported) | 

  - 执行时刻
	- async属性的脚本都在它下载结束之后立刻执行，同时会在window的load事件之前执行,有可能出现脚本执行顺序被打乱的情况
	- defer属性的脚本都是在页面解析完毕之后，按照原本的顺序执行，同时会在document的DOMContentLoaded之前执行。 	
	
	#### 简单描述
	1. 如果async为true，那么脚本在下载完成后异步执行。
	2. 如果async为false，defer为true，那么脚本会在页面解析完毕之后执行。
	3. 如果async和defer都为false，那么脚本会在页面解析中，停止页面解析，立刻下载并且执行， 	

	
### location.replace()与location.assign()区别
	location.replace()的url不会出现在history中
	
### new操作符	
* 创建一个空对象，并且this变量引用该对象，同时还继承了 该函数的原型
* 属性和方法被加入到this引用的对象中
* 新创建的对象由this所引用，并且最后隐式的返回this

### AMD CMD CommonJS
	/* AMD是RequireJS对模块化的定义
	 * CMD是seaJS对模块化的定义
	 * CommonJS是Node对模块化的规范
	 **/
	/* AMD 依赖关系前置 */
	define(['./a', './b'], function (a, b) {
	    a.something();
	    b.something();
	})
	/* CMD 按需加载，依赖就近 */
	define(function (require, exports, module) {
	    var a = require('./a');
	    a.something();
	    var b = require('./b');
	    b.something();
	})

### DOM 操作
	// 创建节点
	createDocumentFragment() document.createDocumentFragment();  // 创建一个新的空白的文档片段
	createElement()
	createTextNode()
	
	// 添加 移除 替换 插入
	appendChild()   
	removeChild()   element.removeChild(child); 
	replaceChild()   replacedNode = parentNode.replaceChild(newChild, oldChild);
	insertBefore()
	
	// 查找
	getElementsByTagName()
	getElementsByName()
	getElementsByClassName()
	getElementById()
	querySelector()
	querySelectorAll()
	
### JS设置css样式的几种方式
	/* 1.直接设置style属性 */
	element.style.height = '100px';
	
	/* 2.直接设置属性 */
	element.setAttribute('height', '100px');
	
	/* 3.使用setAttribute设置style属性 */
	element.setAttribute('style', 'height: 100px !important');
	
	/* 4.使用setProperty设置属性，通过第三个参数设置important */
	element.style.setProperty('height', '300px', 'important');
	
	/* 5.设置cssText */
	element.style.cssText += 'height: 100px !important';
	
### 阻止默认行为
	function stopDefault( e ) {
	    // 阻止默认浏览器动作(W3C)
	    if ( e && e.preventDefault ) {
	        e.preventDefault();
	    } else {
	        // IE中阻止函数器默认动作的方式
	        window.event.returnValue = false;
	    }
	    return false;
	}

### 阻止冒泡
	function stopBubble(e) {
	    // 如果提供了事件对象，则这是一个非IE浏览器
	    if ( e && e.stopPropagation ) {
	        // 因此它支持W3C的stopPropagation()方法
	        e.stopPropagation();
	    } else {
	        // 否则，我们需要使用IE的方式来取消事件冒泡
	        window.event.cancelBubble = true;
	    }
	}

### Ajax交互过程
* 	创建XMLHttpRequest对象,也就是创建一个异步调用对象.
* 	创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
* 	设置响应HTTP请求状态变化的函数.
* 	发送HTTP请求.
* 	获取异步调用返回的数据.
* 	使用JavaScript和DOM实现局部刷新.

### 考察知识点最广的JS面试题 
[一道常被人轻视的前端JS面试题](http://www.cnblogs.com/xxcanghai/p/5189353.html)

	function Foo() {
	    getName = function () { alert(1); }
	    return this;
	}
	
	Foo.getName = function () { alert(2); }
	Foo.prototype.getName = function () { alert(3); }
	var getName = function () { alert(4); }
	function getName () { alert(5); }
	
	/* 写出输出 */
	Foo.getName();  => 2
	getName();   => 4 函数表达式最大的问题，在于js会将此代码拆分为两行代码分别执行。
	Foo().getName(); => 1  此处实际上是将外层作用域内的getName函数修改了。
	getName(); => 1 
	new Foo.getName();  => 2  点（.）的优先级高于new操作，遂相当于是: new (Foo.getName)();
	new Foo().getName(); => 3  运算符优先级括号高于new，实际执行为 (new Foo()).getName()
	new new Foo().getName(); => 3 运算符优先级问题。new ((new Foo()).getName)();

[大部分人都会做错的经典JS闭包面试题](http://www.cnblogs.com/xxcanghai/p/4991870.html)

### JS数组深浅拷贝
-  **slice实现** 	

	*      var arr = ['old', 1, true, null, undefined];
	* 	var new_arr = arr.slice(); 
	* 	new_arr[0] = 'new';
	* 	console.log(arr) // ["old", 1, true, null, undefined]
	* 	console.log(new_arr) // ["new", 1, true, null, undefined]

	
- **concat实现**
 

	 	var arr = ['old', 1, true, null, undefined];
	 	var new_arr = arr.concat();
	 	new_arr[0] = 'new';
		console.log(arr) // ["old", 1, true, null, undefined]
	 	console.log(new_arr) // ["new", 1, true, null, undefined]

以上两种方法只是浅拷贝，如果数组元素是基本类型，就会拷贝一份新的；但是如果 **数组元素是对象或者数组**，就只会拷贝引用（类似指针），修改其中一个就会影响另外一个。

		var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
		var new_arr = arr.concat();
		new_arr[0] = 'new';
		new_arr[3][0] = 'new1';
		console.log(arr) // ["old", 1, true, ['new1', 'old2'], {old: 1}]
		console.log(new_arr) // ["new", 1, true, ['new1', 'old2'], {old: 1}]
	
- **JSON.stringify实现数组深拷贝**
 

	 	var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}];
	 	var new_arr = JSON.parse(JSON.stringify(arr));
		new_arr[0] = 'new';
	 	new_arr[3][0] = 'new1';
		console.log(arr) // ["old", 1, true, ['old1', 'old2'], {old: 1}]
	 	console.log(new_arr) // ["new", 1, true, ['new1', 'old2'], {old: 1}]
	 	
	* 	**JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串** 
	* 	**JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。**
	
简单粗暴，但是问题是不能拷贝函数，不推荐。
	
	## 浅拷贝
	
	var shallowCopy = function (obj) {
		// 判断是否是数组或者对象
	    if (typeof obj !== 'object') {
	        return
	    }
	    var newObj = obj instanceof Array ? [] : {};
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            newObj[key] = obj[key];
	        }
	    }
	    return newObj;
	}
	
	## 深拷贝
	var deepCopy = function (obj) {
	    if (typeof obj !== 'object') {
	        return
	    }
	    var newObj = obj instanceof Array ? [] : {};
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
	        }
	    }
	    return newObj
	}

### 数组去重
Array.prototype.filter()方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。

Array.prototype.indexOf() 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

Array.prototype.sort() 方法在适当的位置对数组的元素进行排序，并返回数组。

- filter + indexOf  
   
		function unique (arr) {
		    var res = arr.filter(function (item, index, array) {
		        return array.indexOf(item) === index;
		    })
		    return res;
		}

- filter + sort 

		function unique (arr) {
		    return arr.concat().sort().filter(function (item, index, array) {
		        return !index || item !== array[index - 1];
		    })
		}

- ES6

		function uniqu3 (arr) {
		    return [... new Set(arr)];
		}
		
		
### 找出数组中的最大值

Array.prototype.reduce() 方法对数组中的每个元素（从左到右）开始执行给定函数，构建一个最终返回值。

- reduce

		var arr = [6, 4, 1, 8, 2, 11, 3];
		function max (prev, next) {
		    return Math.max(prev, next)
		}
		console.log(arr.reduce(max));
		
- apply
	
	
		var arr = [6, 4, 1, 8, 2, 11, 3];
		console.log(Math.max.apply(null, arr));

- ES6
	
		var arr = [6, 4, 1, 8, 2, 11, 3];
		function max (arr) {
		    return Math.max(...arr);   // 扩展运算符（…）
		}
		console.log(max(arr));

## 创建对象
- 工厂模式

		function createPerson(name, age, job){
			var o = new Object();
			o.name = name;
			o.age = age;
			o.job = job;
			o.sayName = function(){
				alert(this.name);
			};
			return o;
		}
		var person1 = createPerson("Nicholas", 29, "Software Engineer");
		var person2 = createPerson("Greg", 27, "Doctor");

## 安全
### 跨域的几种方法
- 主域相同的跨域 
		
		document.domain
- window.postMessage   - WEB API 接口 Html5
- JSONP跨域(只支持GET)

		function todo(data){
		  console.log('The author is: '+ data.name);
		}
		var script = document.createElement('script');
		/* 向服务器www.yeaseonzhang.com发出请求。注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字。 */
		script.src = 'http://www.yeaseonzhang.com/author?callback=todo';
		document.body.appendChild(script);
		/* 服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。 */
		todo({"name": "fewjq"});
		/* 由于<script>元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了todo函数，该函数就会立即调用。作为参数的JSON数据被视为JavaScript对象。*/

- websocket跨域

## CSS 优化

	* 正确的时机调用CSS
	* 使用媒体查询标记<link>，选择性加载
	* 减少css文件数量
	* 压缩css代码
	
## 渲染

[浏览器渲染原理](https://coolshell.cn/articles/9666.html)

