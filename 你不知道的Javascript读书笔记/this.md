> 本文所有内容都来源于《你所不知道的javaScript上卷》，本人只做读书笔记的整理。

# 1. this
this关键字是 JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被**自动定义**在所有函数的作用域中。

但是即使是非常有经验的 JavaScript 开发者也很难说清它到底指向什么。

## 1.1 this 误区
### 1.1.1 this指向自身 -- 错误的

    function foo(num) {     
      console.log( "foo: " + num );

      // 记录foo被调用的次数
      this.count++;
    }
     foo.count = 0;
     var i;
     for (i=0; i<10; i++) {     
       if (i > 5) {         
         foo( i );
        }
     }
    // foo: 6
    // foo: 7
    // foo: 8
    // foo: 9

    // foo被调用了多少次？
    console.log( foo.count ); // 0 -- WTF?

console.log语句产生了 4 条输出，证明foo(..)确实被调用了 4 次，但是foo.count仍然是 0。显然从字面意思来理解this是错误的。

> 执行foo.count = 0 时，的确向函数对象foo添加了一个属性count。
>
> 但是函数内部代码 this.count中的this并不是指向那个函数对象，而是指向了window。
所以虽然属性名相同，根对象却并不相同。

实际上，如果深入探索的话，就会发现这段代码在无意中创建了一个全局变量count，它的值为NaN(**undefined ++ 结果为NAN**)。

修正：
**强制this指向foo函数对象**

    function foo(num) {
        console.log( "foo: " + num );
        // 记录foo被调用的次数
        // 注意，在当前的调用方式下（参见下方代码），this确实指向foo     
        this.count++;
      }  
    foo.count = 0;  
    var i;  
    for (i=0; i<10; i++) {
      if (i > 5) {
          // 使用call(..)可以确保this指向函数对象foo本身
          foo.call( foo, i );     
        }
    }
    // foo: 6
    // foo: 7
    // foo: 8
    // foo: 9

    // foo被调用了多少次？
    console.log( foo.count ); // 4

### 1.1.2 this作用域
**this指向函数的作用域 - 亦对亦错，需要看情况区分**。

> this在任何情况下都不指向函数的词法作用域

**作用域确VS对象**
- 同：可见的标识符都是它的属性
- 异：作用域“对象”无法通过 JavaScript 代码访问，它存在于 JavaScript 引擎内部。


    function foo() {     
      var a = 2;     
      this.bar();
    }
     function bar() {     
       console.log( this.a );
    }

    foo(); // ReferenceError: a is not defined

首先，这段代码试图通过this.bar()来引用bar()函数,这是绝对不可能成功的。

此外，编写这段代码的开发者还试图使用this联通foo()和bar()的词法作用域，从而让 bar()可以访问foo()作用域里的变量a。这是不可能实现的:
> 不能使用this来引用一个词法作用域内部的东西。

> 每当你想要把this和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。

###1.2  this机制
- this既不指向函数自身也不指向函数的词法作用域
- this是在**运行时**进行绑定的，并不是在编写时绑定，它的上下文取决于**函数调用时**的各种条件。
- this的**绑定和函数声明的位置**没有任何关系，只取决于函数的**调用**方式。

###1.3 this调用位置
> 调用位置就是函数在代码中被调用的位置。

注意和声明的位置区分

**调用栈**
> 为了到达当前执行位置所调用的所有函数

 exam: 调用栈和调用位置

    function baz() {
      // 当前调用栈是：baz
      // 因此，当前调用位置是全局作用域

      console.log( "baz" );
      bar(); // <-- bar 的调用位置
    }

    function bar() {
      // 当前调用栈是 baz -> bar
      // 因此，当前调用位置在 baz 中

      console.log( "bar" );
      foo(); // <-- foo 的调用位置
    }

    function foo() {
    // 当前调用栈是 baz -> bar -> foo
    // 因此，当前调用位置在 bar 中

    console.log( "foo" );
    }

    baz(); // <-- baz 的调用位置

可以把调用栈想象成一个函数调用链。

###1.4 this绑定规则
#### 1.4.1 默认绑定 - 独立函数调用
最常用，无法应用其他规则时的默认规则。

exam: 独立函数调用

    function foo() {
      console.log( this.a );
    }

    var a = 2;
    foo(); // 2

当调用 foo() 时，this.a 被解析成了全局变量 a。

> foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则，this 指向全局对象。

**`使用严格模式（strict mode），全局对象将无法使用默认绑定`**

    function foo() {
      "use strict";
      console.log( this.a );
    }

    var a = 2;
    foo(); // TypeError: this is undefined

> 虽然 this 的绑定规则完全取决于调用位置，但是只有 函数运行在非 strict mode 下时，默认绑定才能绑定到全局对象；

严格模式下与 函数 的调用位置无关：

    function foo() {
      console.log( this.a );
    }
    var a = 2;
    (function(){
      "use strict";
      foo(); // 2
    })();

**注意："use strict";的位置**

#### 1.4.2 隐式绑定

    function foo() {
      console.log( this.a );
    }
    var obj = {
      a: 2,
      foo: foo
    };
    obj.foo(); // 2

**思考：**
- 需要注意的是 foo() 的声明方式
- 如何被当作引用属性添加到 obj 中的

> 函数严格的说都不属于引用它的对象
>
> 函数被对象引用时，引用函数的对象“包含”或者”拥有”函数。

当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。

**exam**

    function foo() {
      console.log( this.a );
    }

    var obj2 = {
      a: 42,
      foo: foo
    };

    var obj1 = {
      a: 2,
      obj2: obj2
    };

    obj1.obj2.foo(); // 42

> 对象属性引用链中只有**最顶层**或者说**最后一层**会影响调用位置
##### 1.4.2.1 隐式丢失
一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。

    function foo() {
      console.log( this.a );
    }
    var obj = {
      a: 2,
      foo: foo
    };

    var bar = obj.foo; // 函数别名！
    var a = "oops, global"; // a 是全局对象的属性
    bar(); // "oops, global"

> 虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身

因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

**传入回调函数时this丢失**

    function foo() {
      console.log( this.a );
    }
    function doFoo(fn) {
    // fn 其实引用的是 foo
      fn(); // <-- 调用位置！
    }
    var obj = {
      a: 2,
      foo: foo
    };
    var a = "oops, global"; // a 是全局对象的属性
    doFoo( obj.foo ); // "oops, global"

  <hr />

    function foo() {
      console.log( this.a );
    }
    var obj = {
      a: 2,
      foo: foo
    };
    var a = "oops, global"; // a 是全局对象的属性
    setTimeout( obj.foo, 100 ); // "oops, global"

> 回调函数丢失 this 绑定是非常常见的
>
> 调用回调函数的函数可能会修改 this。

#### 1.4.3 显式绑定
如何在某个对象上强制调用函数？
可以使用函数的 **`call(..)`** 和
**`apply(..)`** 方法。

JavaScript 提供的绝大多数函数以及自定义的所有函数都可以使用 call(..) 和 apply(..) 方法。

**call VS apply**

**`fun.call(thisArg, arg1, arg2, ...)`**  接收两个参数
- t在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于**`非严格模式`**下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
- arg1, arg2, ...
指定的参数列表。


**`fun.apply(thisArg[, argsArray])`**  接收两个参数
- thisArg：在 fun 函数运行时指定的 this 值。
- 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。      从ECMAScript 5 开始可以使用类数组对象。


    function foo() {
      console.log( this.a );
    }
    var obj = {
      a:2
    };
    foo.call( obj ); // 2

> 通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者new Number(..)）。这通常被称为“装箱”。

#### 1.4.3.1 硬绑定

    function foo() {
      console.log( this.a );
    }

    var obj = {
      a:2
    };

    var bar = function() {
      foo.call( obj );
    };

    bar(); // 2
    setTimeout( bar, 100 ); // 2

    // 硬绑定的 bar 不可能再修改它的 this
    bar.call( window ); // 2

> 我们创建了函数 bar()，并在它的内部**手动调用了 foo.call(obj)**，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。  

**硬绑定的典型应用场景就是创建一个<u>`包裹函数`</u>，传入所有的参数并返回接收到的所有值:**

    function foo(something) {
      console.log( this.a, something );
      return this.a + something;
    }

    var obj = {
      a:2
    };

    var bar = function() {
      return foo.apply( obj, arguments );
    };

    var b = bar( 3 ); // 2 3
    console.log( b ); // 5

**另一种使用方法是创建一个可以<u>`重复使用的辅助函数`</u>：**

    function foo(something) {
      console.log( this.a, something );
      return this.a + something;
    }
    // 简单的辅助绑定函数
    function bind(fn, obj) {
      return function() {
        return fn.apply( obj, arguments );
      };
    }
    var obj = {
      a:2
    };
    var bar = bind( foo, obj );

    var b = bar( 3 ); // 2 3
    console.log( b ); // 5

> 由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 `Function.prototype.bind`

**它的用法如下：**

    function foo(something) {
      console.log( this.a, something );
      return this.a + something;
    }
    var obj = {
      a:2
    };
    var bar = foo.bind( obj );

    var b = bar( 3 ); // 2 3
    console.log( b ); // 5

> bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

#### 1.4.3.2 API调用的“上下文”

JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 bind(..) 一样，确保你的回调函数使用指定的 this。

    function foo(el) {
      console.log( el, this.id );
    }

    var obj = {
      id: "awesome"
    };

    // 调用 foo(..) 时把 this 绑定到 obj
    [1, 2, 3].forEach( foo, obj );
    // 1 awesome 2 awesome 3 awesome

> 这些函数实际上就是通过 call(..) 或者 apply(..) 实现了显式绑定，这样你可以少些一些代码。

### 1.4.4 new绑定
**构造函数**
> 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会调用类中的构造函数。通常的形式是这样的：

    something = new MyClass(..);

JavaScript 也有一个 new 操作符，使用方法看起来也和那些面向类的语言一样。然而，JavaScript 中 new 的机制实际上和面向类的语言**完全不同**。

在 JavaScript 中，构造函数只是一些使用new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。

> 它们甚至都不能说是一种特殊的函数类型，它们只是被new 操作符调用的普通函数而已。

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1.	创建（或者说构造）一个全新的对象。
2.	这个新对象会被执行 [[ 原型 ]] 连接。
3.	这个新对象会绑定到函数调用的 this。
4.  如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。


    function foo(a) {
      this.a = a;
    }

    var bar = new foo(2); console.log( bar.a ); // 2

使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this上。

## 1.5 优先级

> 显示绑定 > 隐式绑定 > 默认绑定
>
> new 绑定 > 隐式绑定 > 默认绑定

    function foo() {
      console.log( this.a );
    }

    var obj1 = {
      a: 2,
      foo: foo
    };

    var obj2 = {
      a: 3,
      foo: foo
    };

    obj1.foo(); // 2
    obj2.foo(); // 3

    obj1.foo.call( obj2 ); // 3 <=> foo.call( obj2 );
    obj2.foo.call( obj1 ); // 2 <=> foo.call( obj1 );

  **obj1.foo是对于函数foo的调用**

    function foo(something) {
      this.a = something;
    }

    var  obj1 = {
      foo: foo
    };
    var obj2 = {};
    obj1.foo( 2 );
    console.log( obj1.a ); // 2

    obj1.foo.call( obj2, 3 );
    console.log( obj2.a ); // 3

    var bar = new obj1.foo( 4 );
    console.log( obj1.a ); // 2
    console.log( bar.a ); // 4

>  new 绑定和显式绑定谁的优先级更高呢？

new 和 call/apply 无法一起使用，因此无法通过 new foo.call(obj1) 来直接进行测试。

## 1.6 判断this
现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的顺序来进行判断：

1.	函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
> var bar = new foo()

2.	函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。
> var bar = foo.call(obj2)

3.	函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
> var bar = obj1.foo()

4.	如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
> var bar = foo()

# 2. this 例外
## 2.1 被忽略的this
如果你把 **null** 或者 **undefined** 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则：

    function foo() {
      console.log( this.a );
    }

    var a = 2;
    foo.call( null ); // 2

什么情况下你会传入 null 呢？

一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。类似地，bind(..) 可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用：

    function foo(a,b) {
      console.log( "a:" + a + ", b:" + b );
    }

    // 把数组“展开”成参数
    foo.apply( null, [2, 3] ); // a:2, b:3

    // 使用 bind(..) 进行柯里化
    var bar = foo.bind( null, 2 );
    bar( 3 ); // a:2, b:3

**更安全的this**
在 JavaScript 中创建一个空对象最简单的方法都是
> Object.create(null)

Object.create(null) 和 {} 很像， 但是并不会创建 Object。
prototype 这个委托，所以它比 {}“更空。

    function foo(a,b) {
      console.log( "a:" + a + ", b:" + b );
    }

    // 我们的 DMZ 空对象
    var ø = Object.create( null );
    // 把数组展开成参数
    foo.apply( ø, [2, 3] ); // a:2, b:3

    // 使用 bind(..) 进行柯里化
    var bar = foo.bind( ø, 2 ); bar( 3 ); // a:2, b:3

## 2.2 间接引用

    function foo() {
      console.log( this.a );
    }
    var a = 2;
    var o = { a: 3, foo: foo };
    var p = { a: 4 };
    o.foo(); // 3
    (p.foo = o.foo)(); // 2

> 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是
p.foo() 或者 o.foo()。

### 2.3 箭头函数
箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定义的。

箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。

    function foo() {
      // 返回一个箭头函数
      return (a) => {
        //this 继 承 自 foo()
        console.log( this.a );
      };
    }
    var obj1 = {
      a:2
    };
    var obj2 = {
      a:3
    };

    var bar = foo.call( obj1 );
    bar.call( obj2 ); // 2, 不是 3 ！

foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）的 this 也会绑定到 obj1。

> 箭头函数的绑定无法被修改。（new 也不行！）

# 总结
1. this指向：
    - this既不指向函数自身也不指向函数的词法作用域
    - this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。
    - this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
2. this绑定规则
    - 默认绑定 - 独立函数调用
    - 隐式绑定
      - 隐式丢失
    - 显式绑定
      - 硬绑定
      - API调用的“上下文”
    - new绑定
3. this绑定规则优先级
> 显示绑定 > 隐式绑定 > 默认绑定   
> new 绑定 > 隐式绑定 > 默认绑定
4. 判断this
    - 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
    var bar = new foo()
    - 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。 var bar = foo.call(obj2)
    - 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。 var bar = obj1.foo()
    - 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。 var bar = foo()
5. this 例外
    - 被忽略的this
    - 间接引用
    - 箭头函数
    
### 参考文章
- [Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
