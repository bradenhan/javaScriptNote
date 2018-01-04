# Flex 布局教程：语法篇

网页布局（layout）是 CSS 的一个重点应用。

 CSS 布局模式，有时简称为布局，是一种基于盒子与其兄弟和祖辈盒子的交互方式来确定盒子的位置和大小的算法。有以下几种形式：

- 块布局：用来布置文件。块布局包含以文档为中心的功能，例如 [浮动](https://developer.mozilla.org/zh-CN/docs/CSS/float)元素或将其放置在[多列](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_multi-column_layouts)上的功能。
- 行内布局：用来布置文本。
- 表格布局：用来布置表格。
- 定位布局：用来对那些与其他元素无交互的定位元素进行布置 。
- [弹性盒子布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)：用来布置那些可以顺利调整大小的复杂页面。
- [网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)：用来布置那些与一个固定网格相关的元素。


块级布局更侧重于垂直方向、行内布局更侧重于水平方向，弹性盒子布局算法是方向无关的。

布局的传统解决方案，基于盒状模型，依赖 [display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性 + [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)属性 + [float](https://developer.mozilla.org/zh-CN/docs/CSS/float)属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。那如何实现呢？

![](./images/bg2015071002.png)

2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

![](./images/bg2015071003.jpg)

Flex 布局将成为未来布局的首选方案。

**[demo地址](Demo)**

## 1. Flex 布局是什么？
Flex 是 `Flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

    .box{
      display: flex;
    }

行内元素也可以使用 Flex 布局。

    .box{
      display: inline-flex;
    }

Webkit 内核的浏览器，必须加上`-webkit`前缀。**此部分可以用CSS自动不全插件去实现。**

    .box{
      display: -webkit-flex; /* Safari */
      display: flex;
    }

> 注意，设为 Flex 布局以后，子元素的`float`、`clea`r和`vertical-align`属性将失效。

## 2.基本概念

![](./images/flexbox.png)

- 弹性容器(Flex container)  
  包含着弹性项目的父元素。通过设置 `display` 属性的值为 `flex` 或  `inline-flex` 来定义弹性容器。

- 弹性项目(Flex item)
  弹性容器的每个子元素都称为弹性项目。弹性容器直接包含的文本将被包覆成匿名弹性单元。

- 轴(Axis)  
  每个弹性框布局包含两个轴。弹性项目沿其依次排列的那根轴称为`主轴(main axis)`。垂直于主轴的那根轴称为`侧轴(cross axis)`。

  - [flex-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction) 确立主轴。
  - [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) 定义了在当前行上，弹性项目沿主轴如何排布。
  - [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 定义了在当前行上，弹性项目沿侧轴默认如何排布。
  - [align-self](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self) 定义了单个弹性项目在侧轴上应当如何对齐，这个定义会覆盖由 align-items 所确立的默认值。


- 方向(Direction)  
  弹性容器的`主轴起点(main start)/主轴终点(main end)`和`侧轴起点(cross start)/侧轴终点(cross end)`描述了弹性项目排布的起点与终点。它们具体取决于弹性容器的主轴与侧轴中，由 `writing-mode` 确立的方向（从左到右、从右到左，等等）。

  - [order](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order) 属性将元素与序号关联起来，以此决定哪些元素先出现。
  - [flex-flow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow) 属性是 [flex-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction) 和 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性的简写，决定弹性项目如何排布。


- 行(Line)  
  根据 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性，弹性项目可以排布在单个行或者多个行中。此属性控制侧轴的方向和新行排列的方向。

- 尺寸(Dimension)  
  根据弹性容器的主轴与侧轴，弹性项目的宽和高中，对应主轴的称为`主轴尺寸(main size) `，对应侧轴的称为 `侧轴尺寸(cross size)`。

  - min-height 与 min-width 属性初始值将为 0。
  - [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) 属性是 [flex-grow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)、[flex-shrink](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) 和 [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性的简写，描述弹性项目的整体的伸缩性。

### 3.弹性容器(Flex container)属性
  以下6个属性设置在容器上：

  - flex-direction
  - flex-wrap
  - flex-flow
  - justify-content
  - align-items
  - align-content

#### 3.1 flex-direction属性
`flex-direction`属性决定主轴的方向（即项目的排列方向）。

    .box {
      flex-direction: row | row-reverse | column | column-reverse;
    }
![](./images/bg2015071005.png)

它可能有4个值。
  - row（默认值）：主轴为水平方向，起点在左端。
  - row-reverse：主轴为水平方向，起点在右端。
  - column：主轴为垂直方向，起点在上沿。
  - column-reverse：主轴为垂直方向，起点在下沿。

#### 3.2 flex-wrap属性
默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

![](./images/bg2015071006.png)

    .box{
      flex-wrap: nowrap | wrap | wrap-reverse;
    }

它可能取三个值:

  - `nowrap`（默认）：不换行。

    ![](./images/bg2015071007.png)

  - `wrap`：换行，第一行在上方。

    ![](./images/bg2015071008.jpg)

  - `wrap-reverse`：换行，第一行在下方。

    ![](./images/bg2015071009.jpg)

## 参考资料
- [布局模式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Layout_mode)
- [使用CSS的多列布局](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_multi-column_layouts)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
