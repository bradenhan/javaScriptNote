# Javascript-Array中方法对数组原对象的影响分析

[Javascript-Array中方法对数组原对象的影响分析](http://www.jianshu.com/p/1a7c81093625)

数组对象中的方法按照对原数组的影响分为两类:
- 一类是会改变原数组
- 另一类就是生成原数组的一个拷贝

## 直接改变原数组

  - Array.prototype.fill()  
    fill() 方法将一个数组的所有元素从开始索引填充到具有静态值的结束索引

  - Array.prototype.pop()  
    pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

  - Array.prototpye.push()  
    push() 方法将一个或多个元素添加到数组的末尾，并返回数组的新长度。

  - Array.prototpye.shift()  
    shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

  - Array.prototpye.unshift()  
    unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

## 不会改变原数组

- Array.from()  
Array.from() 方法从一个类似数组或可迭代对象创建一个新的数组实例。
可以用来数组华一个类数组对象例如arguments对象：Array.from(arguments)。

- Array.prototype.concat()  
concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
注意：当concat()对象的参数是一个引用类型的对象的时候，改变该对象，则生层的新书组也将随之改变。

      var arr1 = [1,2,3,4];
      var arr2 = [5,6,7,8];
      var obj = {a:1,b:2};
      var arr3 = arr1.concat(arr2,obj);
      console.log(arr3);
      arr2.push('a');
      obj.a = 12;
      console.log(arr3);

- Array.prototype.copyWithin()  
copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。

- Array.prototype.every()  
every() 方法测试数组的所有元素是否都通过了指定函数的测试。

- Array.prototype.filter()  
filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。

- Array.prototype.find()  
find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

- Array.prototpye.findIndex()  
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

- Array.prototype.forEach()  
forEach() 方法对数组的每个元素执行一次提供的函数。

- Array.prototype.includes()  
includes() 方法用来判断当前数组是否包含某指定的值，如果是，则返回 true，否则返回 false。
可以作为一个通用方法作用于类数组对象上：Array.prototype.includes.call(arguments,arg);

- Array.prototype.indexOf()  
indexOf()方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回-1。

- Array.prototype.join()  
join() 方法将数组或一个类数组对象的所有元素连接到一个字符串中。

- Array.prototype.keys()  
keys()方法返回一个新的Array迭代器，它包含数组中每个索引的键。

- Array.prototype.lastIndexOf()  
lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

- Array.prototype.map()  
map() 方法创建一个新数组，其结果是该数组中的每个元素调用一个提供的函数。

- Array.prototype.reduce()  
reduce() 方法对累加器和数组的每个值 (从左到右)应用一个函数，以将其减少为单个值。

- Array.prototpye.reduceRight()  
reduceRight() 方法接受一个函数作为累加器（accumulator），让每个值（从右到左，亦即从尾到头）缩减为一个值。（与 reduce() 的执行方向相反）

- Array.prototpye.reverse()  
reverse() 方法颠倒数组中元素的位置。第一个元素会成为最后一个，最后一个会成为第一个。

- Array.prototpye.slice()  
slice()方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改

- Array.prototype.toLocaleString()  
toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

- Array.prototpye.toString()  
toString() 返回一个字符串，表示指定的数组及其元素。

- Array.prototpye.values()  
values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。
