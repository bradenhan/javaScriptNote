#JavaScript——slice和splice的区别.md


1. slice  
    slice是指定在一个数组中的元素创建一个新的数组，即原数组不会变

    var color = new Array('red','blue','yellow','black');
    var color2 = color.slice(1,2);
    alert(color); 　　//输出   red,blue,yellow,black
    alert(color2);   //输出   blue;注意：这里只有第二项一个值

2. splice  
    splice是JS中数组功能最强大的方法，它能够实现对数组元素的删除、插入、替换操作，返回值为被操作的值。

    - splice删除： color.splice(1,2) （
    删除color中的1、2两项）；

    - splice插入： color.splice(1,0,'brown','pink')
    （在color键值为1的元素前插入两个值）；

    - splice替换：  color.splice(1,2,'brown','pink') （在color中替换1、2元素）；


      var color = new Array('red','blue','yellow','black');
      var color2 = color.splice(2,3,'brown','pink');
      alert(color);     //  red,blue,brown,pink
      alert(color2);    //  yellow,black

### [Array.prototype.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

**语法**

    array.splice(start)

    array.splice(start, deleteCount)

    array.splice(start, deleteCount, item1, item2, ...)

--------

    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

    myFish.splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
    // myFish 变为 ["angel", "clown", "drum", "mandarin", "sturgeon"]

    myFish.splice(2, 1); // 从索引为2的位置删除一项（也就是'drum'这一项）
    // myFish 变为 ["angel", "clown", "mandarin", "sturgeon"]


### [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原始数组不会被修改。


    var a = ['zero', 'one', 'two', 'three'];
    var sliced = a.slice(1, 3);

    console.log(a);      // ['zero', 'one', 'two', 'three']
    console.log(sliced); // ['one', 'two']

**语法**

    arr.slice();
    // [0, end]

    arr.slice(begin);
    // [begin, end]

    arr.slice(begin, end);
    // [begin, end)    

### 判断一个字符串中出现次数最多的字符，统计这个次数


    <p>判断一个字符串中出现次数最多的字符，统计这个次数</p>  
    <button onclick="btn()">点击</button>  
    <p id="p1"></p>  
    <p id="p2"></p>

    <script>
      var a=[0,1,2,1,2,5,5,3,1,3,5,1,2,4,0,5]   //给定数组   
      var p=document.getElementById('p1');  
      var p2=document.getElementById('p2');  
      var yuansu=new Array();   //储存元素  
      var count=new Array();    //储存元素个数  
      var m=1;

     // 去重并统计重复的个数  
     function btn () {

      // 去重
       for(i=0;i<a.length;i++){  
           for(x=i+1;x<a.length;x++){  
               if(a[i]==a[x]){  
                   a.splice(x,1)  
                   m++;  
               }  
           }  
          yuansu[i]=a[i];  
          count[i]=m;  
          m=1;  
       }

      // 对count数组 复制一份在进行排序
      var coln = new Array();  
      for(s=0;s<count.length;s++){  
        coln[s] = count[s]  
      }  
      function abc (a,b) {  
          return a-b;  
      }  
      coln.sort(abc)  

      // 统计最多的元素 以及 有几个最多的
     var fcount=0;  //有几个最多的  
     var first="";  
     for(i=0;i<count.length;i++){  
        if(count[i]==coln[coln.length-1]){  
         first+=yuansu[i]+"出现最多,出现"+count[i]+"次"+"<br>"  
          fcount++;  
        }  
     }
     p.innerHTML="最多的有"+fcount+"个";  
     p2.innerHTML=first;  
    }    

    </script>

----------------

    <script>
      var str = "zhaochucichuzuiduodezifu";
      var o = {};
      for (var i = 0, length = str.length; i < length; i++) {
      	// var char = str[i];
      	var char = str.charAt(i);
      	if (o[char]) { //char就是对象o的一个属性，o[char]是属性值，o[char]控制出现的次数
      		o[char]++; //次数加1
      	} else {
      		o[char] = 1; //若第一次出现，次数记为1
      	}
      }
      console.log(o); //输出的是完整的对象，记录着每一个字符及其出现的次数
      //遍历对象，找到出现次数最多的字符和次数
      var max = 0;
      var maxChar = null;
      for (var key in o) {
      	if (max < o[key]) {
      		max = o[key]; //max始终储存次数最大的那个
      		maxChar = key; //那么对应的字符就是当前的key
      	}
      }
      console.log("最多的字符是" + maxChar);
      console.log("出现的次数是" + max);
    </script>

-----------

    <script>
      var s="aaaab0101002055AAAABBB&I!bbbsss";
      var fres={};  //用来记录所有的字符的出现频次
      var mostFreqChar=''; //用来记录最大频次的字符
      for(var i=0;i<s.length;i++){
        var char=s[i];
        if(!fres[char]){
         fres[char]=0;
        }

        fres[char]++;
        if(mostFreqChar==''||fres[char]>fres[mostFreqChar]){
         mostFreqChar=char;
        }
      }
      console.log(mostFreqChar);
      console.log(fres[mostFreqChar]);
    </script>
