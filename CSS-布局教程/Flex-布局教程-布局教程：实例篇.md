# Flex 布局教程：实例篇

介绍了Flex布局的语法，今天介绍常见布局的Flex写法.

不管是什么布局，Flex往往都可以几行命令搞定。

![](./images/bg2015071327.png)

我只列出代码，详细的语法解释请查阅《[Flex布局教程：语法篇](./Flex-布局教程-语法篇.md)》。

## 1.骰子的布局
骰子的一面，最多可以放置9个点。

![](./images/bg2015071328.png)

下面，就来看看Flex如何实现，从1个点到9个点的布局。你可以到[codepen](https://codepen.io/LandonSchropp/pen/KpzzGo)查看Demo。

![](./images/bg2015071329.png)

如果不加说明，本节的HTML模板一律如下。

    <div class="box">
      <span class="item"></span>
    </div>

上面代码中，div元素（代表骰子的一个面）是Flex容器，span元素（代表一个点）是Flex项目。如果有多个项目，就要添加多个span元素，以此类推。

### 1.1 单项目
首先，只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。

![](./images/bg2015071301.png)

    .box {
      display: flex;
    }

设置项目的对齐方式，就能实现居中对齐和右对齐。

![](./images/bg2015071302.png)

    .box {
      display: flex;
      justify-content: center;
    }

![](./images/bg2015071303.png)

    .box {
      display: flex;
      justify-content: flex-end;
    }

设置交叉轴对齐方式，可以垂直移动主轴。

![](./images/bg2015071304.png)

    .box {
      display: flex;
      align-items: center;
    }

![](./images/bg2015071305.png)

    .box {
      display: flex;
      justify-content: center;
      align-items: center;
    }

![](./images/bg2015071306.png)

    .box {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

![](./images/bg2015071307.png)

    .box {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

### 1.2 双项目

![](./images/bg2015071308.png)

    .box {
      display: flex;
      justify-content: space-between;
    }

![](./images/bg2015071309.png)

    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

![](./images/bg2015071310.png)

    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

![](./images/bg2015071311.png)

    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

![](./images/bg2015071312.png)

    .box {
      display: flex;
    }

    .item:nth-child(2) {
      align-self: center;
    }

![](./images/bg2015071313.png)

    .box {
      display: flex;
      justify-content: space-between;
    }

    .item:nth-child(2) {
      align-self: flex-end;
    }

### 1.3 三项目

![](./images/bg2015071314.png)

    .box {
      display: flex;
    }

    .item:nth-child(2) {
      align-self: center;
    }

    .item:nth-child(3) {
      align-self: flex-end;
    }

### 1.4 四项目
![](./images/bg2015071315.png)

    .box {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-content: space-between;
    }

![](./images/Jietu20180108-220133.jpg)

HTML代码如下。

    <div class="box">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
      </div>
      <div class="column">
        <span class="item">3</span>
        <span class="item">4</span>
      </div>
    </div>

CSS代码如下。

    .box {
      display: flex;
      flex-wrap: wrap; // column 换行
      align-content: space-between;
    }

    .column {
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
    }

### 1.5 六项目
![](./images/Jietu20180108-220951.jpg)

HTML代码：

    <div class="box">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>
      </div>
      <div class="column">
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>
      </div>
    </div>

CSS代码如下。

    .box {
      display: flex;
      flex-wrap: wrap; // column 换行
      align-content: space-between;
    }

    .column {
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
    }

![](./images/Jietu20180108-222354.jpg)

HTML:

    <div class="box">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>
      </div>
      <div class="column">
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>
      </div>
    </div>

CSS:

    .box {
      display: flex;
    	justify-content: space-between;
    }

    .column {
      display: flex;
    	flex-direction: column;
      justify-content: space-between;
    }

![](./images/bg2015071319.png)

HTML:

    <div class="box">
      <div class="row">
        <span class="item"></span>
        <span class="item"></span>
        <span class="item"></span>
      </div>
      <div class="row">
        <span class="item"></span>
      </div>
      <div class="row">
       <span class="item"></span>
       <span class="item"></span>
      </div>
    </div>

CSS:

    .box {
      display: flex;
      flex-wrap: wrap;
    }

    .row{
      flex-basis: 100%;
      display:flex;
    }

    .row:nth-child(2){
      justify-content: center;
    }

    .row:nth-child(3){
      justify-content: space-between;
    }

### 1.6 九项目
![](./images/Jietu20180108-223834.jpg)

HTML:

    <div class="box">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>  
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>  
        <span class="item">7</span>
        <span class="item">8</span>
        <span class="item">9</span>
    </div>

CSS:

    .box {
      display: flex;
      flex-wrap: wrap;
    	justify-content: space-between;
      align-items: center;
    }




## 参考资料
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
