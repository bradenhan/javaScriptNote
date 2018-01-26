# 使用HTML5的音频和视频

## [使用 HTML5 的音频和视频](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video)

[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 元素嵌入和允许操作新的多媒体内容。

HTML5 通过HTML标签“audio”和“video”来支持嵌入式的媒体，使开发者能够方便地将媒体嵌入到HTML文档中。

- **嵌入媒体**

      <video src="http://v2v.cc/~j/theora_testsuite/320x240.ogg" controls>
        你的浏览器不支持 <code>video</code> 标签.
      </video>

      <audio src="/test/audio.ogg" preload="auto">
        <p>你的浏览器不支持audio标签</p>
      </audio>

      <video controls>
        <source src="foo.ogg" type="video/ogg">
        <source src="foo.mp4" type="video/mp4">
        Your browser does not support the <code>video</code> element.
      </video>

    **说明**
    - src 属性可以设置为一个音频文件的URL或者本地文件的路径。
    - controls : 为网页中的音频显示标准的HTML5控制器。
    - autoplay : 使音频自动播放。
    - loop : 使音频自动重复播放。
    - preload属性用来缓冲audio元素的大文件，有三个属性值可供设置：
      - "none" 不缓冲文件
      - "auto" 缓冲音频文件
      - "metadata" 仅仅缓冲文件的元数据
    -  `<source>` 标签来指定多个文件，以为不同浏览器提供可支持的编码格式。
      - type 指定视频文件需要的视频编解码器的值；这样允许浏览器做出更加正确的决定


- **媒体操作**
  1. **媒体播放器回放(重新播放)**

          var v = document.getElementsByTagName("video")[0];
          v.play()

  2. **媒体播放器的播放、暂停、增减音量**

          <audio id="demo" src="audio.mp3"></audio>
          <button onclick="document.getElementById('demo').play()">播放声音</button>
          <button onclick="document.getElementById('demo').pause()">暂停声音</button>
          <button onclick="document.getElementById('demo').volume+=0.1">提高音量</button>
          <button onclick="document.getElementById('demo').volume-=0.1">降低音量</button>

  3. **终止媒体下载**

      停止媒体播放很简单，只要调用 pause() 方法即可，然而浏览器还会继续下载媒体直至媒体元素被垃圾回收机制回收。

      `即刻停止媒体下载的方法`

          var mediaElement = document.getElementById("myMediaElementID");
          mediaElement.pause();
          mediaElement.src='';
          //or
          mediaElement.removeAttribute("src");

      通过移除媒体元素的 `src` 属性（或者直接将其设为一个空字符串——这取决于具体浏览器）， 你可以摧毁该元素的内部解码，从而结束媒体下载。removeAttribute() 操作并不干净， 而将`<video>`元素的 'src' 属性设为空字符串可能会引起我们不想要的请求（Mozilla Firefox 22）。

  4. **在媒体中查找**

      媒体元素支持在媒体的内容中从当前播放位置`移到某个特定点`。 这是通过设置元素的属性`currentTime`的值来达成的；有关元素属性的详细信息请看[HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 。 简单的设置那个你希望继续播放的以秒为单位时间值。

      你可以使用元素的属性`seekable`来决定媒体目前能查找的范围。它返回一个你可以查找的`TimeRanges` 时间对象。

          var mediaElement = document.getElementById('mediaElementID');
          mediaElement.seekable.start();  // 返回开始时间 (in seconds)
          mediaElement.seekable.end();    // 返回结束时间 (in seconds)
          mediaElement.currentTime = 122; // 设定在 122 seconds
          mediaElement.played.end();      // 返回浏览器播放的秒数

  5. **标记播放范围**

      在给一个`<audio>`或者`<video>`元素标签`指定媒体的URI`的时候，你可以选择性地加入一些额外信息来指定媒体将要播放的部分。要这样做的话，需要附加一个哈希标志("#")，后面跟着媒体片段的描述。

      一条指定时间范围的语句：
      > `#t=[starttime][,endtime] `

      时间值可以被指定为`秒数`（如浮点数）或者为以`冒号`分隔时/分/秒格式（像2小时5分钟1秒表示为2:05:01）。

      `一些例子：`

          http://foo.com/video.ogg#t=10,20
          指定视频播放范围为从第10秒到第20秒.
          http://foo.com/video.ogg#t=,10.5
          指定视频从开始播放到第10.5秒.
          http://foo.com/video.ogg#t=,02:00:00
          指定视频从开始播放到两小时.
          http://foo.com/video.ogg#t=60
          指定视频从第60秒播放到结束.
