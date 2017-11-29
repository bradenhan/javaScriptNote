## JS跨域
js跨域：在不同的域名下不能进行数据交互，为了安全。

跨域问题：

- 主域和子域之间
- 不同域名之间


ajxa : XMLHttpRequest () 不能跨域

1. 自主域和子域之间

         document.domain
         
2. 服务器代理。XMLHttpRequest 代理文件
3. script标签 ： jsonp  (script标签不存在跨域)  // 单域操作
    
        <script src="xxx.php?key=value&key2=value2"></script>
        
        jsonp : json + padding （内填充原理，把JSON填充到一个盒子里）
        
         b网站执行
        box({name : 'name'})
        
         a网站调用
        function box(json){  
            console.log(json);
        }

        // 动态创建标签
        function createJS(sUrl){
        	var oScript = document.createElement('script');
        	oScript.src = sUrl;
        	document.getElementsByTagName('head')[0].appendChild(oScript)
        }
        createJS('jsonp.js?callback=box') // jsonp那边会自动生成 外部包裹为box ,做到我们可以自控制
        
4.  location.hash 通过iframe. A 网站嵌入一个B网站的iframe  // 双域操作
        
        parent.location.hash 调用
        <iframe src="xxxx.php#key1=value1&key2=value2"></iframe>

5. window.name 

6. flash 
7. postMessage

### 原生ajxa请求

    (function(){
    	var oBtn = document.getElementById('btn');
    	oBtn.onclick = function(){
    		var xhr = new new XMLHttpRequest();
    		xhr.onreadystatechange = function(){
    			if(xhr.readyState == 4){
    				if(xhr.status == 200){
    					console.log(xhr.responseText);
    				}
    			}
    		}
    
    		xhr.open('get','1.txt',true);
    
    		xhr.send();
    	}
    })()
