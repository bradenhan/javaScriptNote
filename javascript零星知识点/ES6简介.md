## ES6常用知识点

- 变量的新定义——let和const
- 函数的变化——箭头函数，剩余参数，参数默认值
	* 箭头函数不能作为构造函数
	* 箭头函数没有它自己的this值，箭头函数内的this值继承自外围作用域
	* 箭头函数没有arguments
	* 在使用剩余参数**[...args]**时，需要注意的是，将这部分放在所有参数的最后位置
	
- 数组——解构赋值、二进制数组
- 字符串——模版字符串、startsWith、endsWidth
- Iterator和for...of 
	* Iterator的概念是迭代器,主要是一个集合类元素**(数组、对象)**的遍历机制
- Generator和Promise
- Class和extends

### Math、Number、String 、Array、Object 扩展

1. Math：
    - trunc：用于去除一个数的小数部分，返回整数部分；
    - sign：用来判断这个数是正数负数还是0，如果是正数就打印1，负数打印-1,0打印0，-0打印-0；
    - cbrt 用来计算一个数的立方根。
    
2. Number：
     - isInter：判断一个数是否是整数；
     - isNaN：里面的数只有是NaN的时候是true，别的全部都是fales，用来判断这个数是不是非数字。
    
3. String：
     - includes：判断一个字符串里面有没有包含某个字符；
     - startsWith：判断一个字符串以某个字符开头；
     - endsWith：判断一个字符串以某个字符结尾；
     - repeat 重复打印某个字符串。
    
4. Array：
    - Array.feom：复制一个数组；
    - Array.of：把多个数字放在一个数组里，类似于 new Array；
    - fill：第一个参数是要把数组里的值改成什么，达尔戈参数是从数组的哪一位开始，它不管后面有多少数都要改变。
    
5. Object：
    - Object.assign：浅拷贝一个数组；
    - Object.setPrototypeOf：设置原型。
