# [HTML中的表单概述](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Forms_in_HTML)

HTML5中的表单元素和属性提供了：
  - 比HTML4更多的语义标记，
  - 取消了大量的在HTML4不可缺少的脚本和样式。

HTML5中的表单功能：
  - 为用户提供了更好的体验，使表单在不同网站之间更一致，
  - 并向用户提供有关数据输入的即时反馈。
  - 它们还为使用禁用脚本的浏览器的用户提供相同的用户体验。

本文总结了HTML5中的表单变化。有关使用表单的详细指南，请参阅我们更多的[HTML表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms)。

# [form概述](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)
`HTML <form>` 元素 表示了文档中的一个区域，这个区域包含有交互控制元件，用来向web服务器提交信息。

可以用 [:valid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) 和 [:invalid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) CSS 伪类 来给一个元素指定样式。

**扩展**
  - :valid CSS 伪类 表示任何其内容根据设置的输入类型正确地验证的`<input> `或 `<form> `元素。
  - :invalid CSS 伪类（CSS pseudo-class ）表示任何 `<input>` 或 `<form>` 元素的内容无法通过输入的类型设置的验证。 这使您可以轻松设置无效字段的外观，帮助用户识别并更正错误。

    这允许容易地使有效的字段采用有助于用户确认其数据格式正确的外观。


        <form>
          <label>Enter a URL:</label>
          <input type="url" />
          <br />
          <br />
          <label>Enter an email address:</label>
          <input type="email" required/>
        </form>
      -----------
        <style>
          input:invalid {
            background-color: #ffdddd;
          }

          form:invalid {
            border: 5px solid #ffdddd;
          }

          input:valid {
            background-color: #ddffdd;
          }

          form:valid {
            border: 5px solid #ddffdd;
          }

          input:required {
            border-color: #800000;
            border-width: 3px;
          }

          input:required:valid {
            border-color: #008000;
          }
        </style>

| title | value |
|-|-|
| 内容分类 | [Flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content), palpable content |
| 可包含内容 |  Flow content, 但是不包括 <form> 元素 |
| 标签省略 |  不允许，开始标签和结束标签都不能省略。 |
| 允许的父元素 |  任何接受 flow content 的元素 |
| DOM接口  |  [HTMLFormElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement) |

## 属性

这个元素包括一些 [全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)。

- accept （HTML 4）【已废弃】
- accept-charset 服务器支持的字符编码，默认值是一个保留字符串“UNKNOWN”。和包含这个form元素的文档相同的编码。
- action 一个处理这个form信息的程序所在的URL。这个值可以被 `<button>` 或者 `<input>` 元素中的 [formaction](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#attr-formaction) 属性重载（覆盖）。
- autocomplete 用于指示 input 元素是否能够拥有一个默认值，这个默认值是由浏览器自动补全的。   
  **取值**

  - off: 在每一个用到的输入域里，用户必须显式的输入一个值，或者document 以它自己的方式提供自动补全；浏览器不会自动补全输入。
  - on: 浏览器能够根据用户之前在form里输入的值自动补全。

- method     
  浏览器以何种方式利用`HTTP`来提交 `form`.  
  **取值**
  - post : 指的是 [HTTP POST](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) 方法 ; 表单数据会包含在表单体内然后发送给服务器.
  - get : 指的是 [HTTP GET](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) 方法; 表单数据会附加在 action 属性的URI中，并以 '?' 作为分隔符, 然后这样得到的 URI 再发送给服务器.

    这样做（数据暴露在URI里面）没什么副作用，或者表单仅包含ASCII字符时，再使用这种方法吧。

  这个值可以被 `<button>` 或者 `<input>` 元素中的 `formmethod` 属性重载（覆盖）。

- enctype  
  form提交给服务器的内容的 [MIME](https://en.wikipedia.org/wiki/Media_type) 类型，form 的 method 属性值为 post。   
  **取值**
    - application/x-www-form-urlencoded: 如果属性未指定时的默认值。
    - multipart/form-data: 这个值用于一个 type 属性设置为 "file" 的 `<input>` 元素。
    - text/plain (HTML5)
    -
  这个值可以被 `<button>` 或者 `<input>` 元素中的 formenctype 属性重载（覆盖）。  

- name  
  form的名字。
  - 在HTML4中，这个用法不被推荐(作为替代，应该使用id).
  - HTML5中，一个文档中的多个form当中，name必须唯一而不仅仅是一个空字符串。  
- novalidate  
  提交时`form`是否没有被验证。  
  如果这个属性没有指定 (因此这个 form 是验证通过的)。  
  这个默认设置可以被属于这个form的 `<button>` 或者 `<input>` 元素中的 formnovalidate 属性重载（覆盖）。

- target  
  一个名字或者说关键字，用来指示在提交表单之后，在哪里显示收到的回复.   
  在 HTML 4 里, 这是一个用于 frame 的名字/关键字.  
  在 HTML5 里, 这是一个用于 browsing context 浏览器上下文  的名字/关键字 (举例来说, 标签页tab, 窗口window, or 或者行内 frame).

  **如下的关键字含有特别的含义:**

    - _self: 在当前HTML4或HTML5文档页面重新加载返回值。这个是默认值。译注：也就是说如果这个文档在一个frame中的话，self是在当前frame（document）中重新加载的，而不是整个页面（window）。
    - _blank: 以新的HTML4或HTML5文档窗口加载返回值。
    _parent: 在父级的frame中以HTML4或HTML5文档形式加载返回值，如果- 没有父级的frame，行为和_self一致。
    - _top: 如果是HTML 4文档: 清空当前文档，加载返回内容；HTML5: 在当前文档的最高级内加载返回值，如果没有父级，和_self的行为一致。
    - iframename: 返回值在指定frame中加载。

  这个值可以被 `<button>` 或者 `<input>` 元素中的 formtarget 属性重载（覆盖）。

##参考文档
 - [form](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)
 - [HTML表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms)
