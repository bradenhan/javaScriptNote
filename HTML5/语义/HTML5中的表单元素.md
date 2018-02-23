# HTML5中的表单元素

## `<input>` 元素type属性增加

> 默认的类型是 text

#### html5新增 [demo地址](http://sandbox.runjs.cn/show/hfeawni7)

- `color` 用于指定颜色的控件。<br>
  **存在问题**
  - Chrome支持 Safari不支持
  - IOS并不支持
  <br><br>
- `date` 用于输入日期的控件（年，月，日，不包括时间）。<br>
  **存在问题**
  - 都支持，但是支持的不是很好，会有各种各样的小问题，华为meta9上面使用该控件 基本上面目全非，有条件还是自己写一个。
  <br><br>
- ~~datetime~~ 基于 UTC 时区的日期时间输入控件（时，分，秒及几分之一秒）。

- `datetime-local` 用于输入日期时间控件，不包含时区。<br>
  **存在问题**
  - 同`date`相关问题
  <br><br>

- `month` 用于输入年月的控件，不带时区。<br>
  **存在问题**
  - 同`date`相关问题
    <br><br>

- `week` 用于输入一个由星期-年组成的日期，日期不包括时区。<br>
  **存在问题**
  - 同`date`相关问题
    <br><br>
- `time` 用于输入不含时区的时间控件。<br>
  **存在问题**
  - 同`date`相关问题
    <br><br>

- `email` 用于编辑 e-mail 的字段。 合适的时候可以使用 :valid 和 :invalid CSS 伪类。<br>
  **存在问题**
  - Chrome支持 Safari不支持
  - 一般都不会使用该控件,为了达到验证的统一  <br><br>

- `number` 用于输入浮点数的控件。<br>
  **存在问题**
  - Chrome支持 Safari支持
  - e可以输入
    - 解决方案:`<input onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" type="number"/>`
  <br><br>

- `range` 用于输入不精确值控件。如果未指定相应的属性，控件使用如下缺省值：
    - min：0
    - max：100
    - value：min + (max-min)/2，或当 max 小于 min 时使用 min
    - step：1
    <br><br>

- `search` 用于输入搜索字符串的单行文本字段。换行会被从输入的值中自动移除。<br>
  **存在问题**
  - Chrome支持 Safari不支持
  - 很少使用
  <br><br>

- `tel` 用于输入电话号码的控件；换行会被自动从输入的值中移除A，但不会执行其他语法。可以使用属性，比如 pattern 和 maxlength 来约束控件输入的值。恰当的时候，可以应用 :valid 和 :invalid CSS 伪类。<br> <br>  

- `url` 用于编辑URL的字段。 The user may enter a blank or invalid address. 换行会被自动从输入值中移队。可以使用如：pattern 和 maxlength 样的属性来约束输入的值。 恰当的时候使可以应用 :valid 和 :invalid CSS 伪类。<br>
  **存在问题**
  - Chrome支持 Safari支持
  - 一般都不会使用该控件,为了达到验证的统一
<br><br>

###  `<input>` 元素也拥有一些新的特性。  
  - list： `<datalist>` 元素的 ID，该元素的内容，`<option>` 元素被用作提示信息，会在 input 的建议区域作为提议显示出来。<br><br>
  - **pattern：** 一个正则表达式，用于检查控件的值，能够作用于 type 值是 text， tel， search， url， 和 email 的 input 元素。<br><br>
  - form： 一个字符串，用于表明该 input 属于哪个 `<form>` 元素。一个 input 只能存在于一个表单中。<br><br>
  - formmethod：一个字符串，用于表明表单提交时会使用哪个 HTTP 方法 (GET 或 POST)；如果定义了它，则可以覆盖  `<form>` 元素上的 method 特性。只有当 type 值为 image 或 submit，并且 form 特性被设置的情况下， formmethod 才能生效。<br><br>
  - x-moz-errormessage ： 一个字符串，当表单字段验证失败后显示错误信息。该值为 Mozilla 扩展，并非标准。

## `<output>` 元素
  [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/output) 元素表示计算的结果。


  你可以使用 for 特性来在 `<output>` 元素与文档内其他能够影响运算的元素(例如，input 或参数)建立关联。 for 特性的值是以空格做分隔的其他元素的 ID 列表。

    <form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
        <input type="range" name="b" value="50" /> +
        <input type="number" name="a" value="10" /> =
        <output name="result"></output>
    </form>

## placeholder 特性

## autofocus 特性
[autofocus](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-autofocus) 特性让你能够指定一个表单控件，当页面载入后该表单自动获得焦点，除非用户覆盖它，`例如在另一个控件中输入值。`一个文档内只有一个表单能够拥有 autofocus 特性，它是一个 Boolean 值。

**使用范围**<br>   
这个特性适用于 `<input>`， `<button>`， `<select>`，与 `<textarea>` 元素。<br><br>
**例外**<br>
例外情况是，如果一个 autofocus 元素的 type 特性值设置成了 hidden，则 autofocus 无法生效(就是说，你无法让一个隐藏控件自动获得焦点)。

## 约束验证
HTML5 为客户端表单的验证提供了语法与 API。当然这些功能无法取代服务器端验证，出于安全性与数据完整性的考虑，服务器端验证仍然必不可少，但是客户端验证能够通过对输入数据的即时反馈来提供良好的用户体验。

如果 `<input>` 元素设置了 title 特性，当验证失败时，特性值会显示在提示信息中。如果 title 设置为空字符串，则不会显示提示信息。如果没有设置 title 特性，会使用标准验证信息(例如通过 x-moz-errormessage 特性指定，或调用 setCustomValidity() 方法) 代为显示。

### 约束验证的 HTML 语法
下列 HTML5 语法中的条目用于为表单数据指定约束。

- `<input>`, `<select>`， 和 `<textarea>` 元素上的 required 特性，指定必须提供该元素的值。(在  `<input>` 元素上， required 只能与特定的 type 特性值结合起来生效。)
- `<input>` 元素上的 pattern 特性用于限定元素值必须匹配一个特定的正则表达式。
- `<input>` 元素上的 min 与 max 特性限定了能够输入元素的最大与最小值。
- `<input>` 元素的 step 特性(与 min 与 max 特性结合使用) 限定了输入值的间隔。如果一个值与允许值的梯级不相符，则它无法通过验证。
- `<input>` 与 `<textarea>` 元素的 maxlength 特性限制了用户能够输入的最大字符数(在 Unicode 代码点内)。
- type 的 url 与 email 值分别用于限制输入值是否为有效的 URL 或电子邮件地址。


此外，若要阻止对表单进行约束验证，你可以在   `<form>` 上设置 novalidate 特性，或在  `<button>` 与 `<input>` 元素(当 type 是 submit 或 image)上设置 formnovalidate 特性。这些特性指定了当表单提交时不做验证。

### 约束验证 API
下面这些 DOM 属性与方法和约束验证相关，能够在客户端脚本中使用：

- [HTMLFormElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement) 对象上的 checkValidity() 方法，当表单的相关元素都通过了它们的约束验证时返回 true，否则返回 false。
- 在 表单相关元素上：
  - willValidate 属性，如果元素的约束没有被符合则值为 false。
  - validity 属性，是一个 ValidityState 对象，表示元素当前所处的验证状态(就是说约束成功或是失败)。
  - validationMessage 属性，用于描述与元素相关约束的失败信息。
  - checkValidity() 方法，如果元素没有满足它的任意约束，返回false，其他情况返回 true。
  - setCustomValidity() 方法，设置自定义验证信息，用于即将实施与验证的约束来覆盖预定义的信息。

### 参考文当
- [HTML-input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)
- [2017年h5新增input的支持情况](http://www.cnblogs.com/mrzhu/p/7844514.html)
