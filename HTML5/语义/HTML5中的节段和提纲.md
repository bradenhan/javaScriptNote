# HTML5 中的节段和提纲

## 1. [HTML5 中的节段和提纲](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document#%E6%80%BB%E7%BB%93)
HTML5中新的节段和标题标签带来了以标准的方法来描述web文档的结构和大纲。其为人们使用HTML5浏览器和需要结构来帮助他们理解页面带来了一个很大的优势。

例如，人们需要一些辅助技术的帮助。这些新的语义元素使用简单，几乎没有负担，也可以在不支持HTML5的浏览器中工作。因此，他们应该被广泛使用。

HTML5 中新的提纲和节段元素一览:
- `<section>` [查看详情](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)

      <section>
        <h1>Heading</h1>
        <p>Bunch of awesome content</p>
      </section>

- `<article>`

      <article class="film_review">
        <header>
          <h2>Jurassic Park</h2>
        </header>
        <section class="main_review">
          <p>Dinos were great!</p>
        </section>
        <section class="user_reviews">
          <article class="user_review">
            <p>Way too scary for me.</p>
            <footer>
              <p>
                Posted on <time datetime="2015-05-16 19:00">May 16</time> by Lisa.
              </p>
            </footer>
          </article>
          <article class="user_review">
            <p>I agree, dinos are my favorite.</p>
            <footer>
              <p>
                Posted on <time datetime="2015-05-17 19:00">May 17</time> by Tom.
              </p>
            </footer>
          </article>
        </section>
        <footer>
          <p>
            Posted on <time datetime="2015-05-15 19:00">May 15</time> by Staff.
          </p>
        </footer>
      </article>

- `<nav>`

      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

- `<header>`

      <header>
        a logo
      </header>

- `<footer>`
- `<aside>`  
- `<hgroup>` (已废弃)
