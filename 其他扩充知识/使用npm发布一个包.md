## 使用npm发布一个包

npm 越来月流行，那么如何使用npm发布一个package? 这个是值得我们思考的问题。

经过网上查找实现方法，并自己实践了一下，发现也并不是特别难的事情。

### 一、准备工作 -- 安装nodeJs并配置 npm

#### 1. 安装nodeJs

**step 1:**  访问nodejs官网，点击稳定版，并下载[https://nodejs.org/](https://nodejs.org)

**step 2:**  双击刚下载的文件，按步骤默认安装就行

**step 3:**  安装完成后打开终端，输入
> npm -v
>
> node -v

两个命令，出现版本信息，说明安装成功。


#### 2. 将npm包的镜像换成  https://www.npmjs.com/

> npm config set registry https://www.npmjs.com/

#### 3. 如果自己电脑不是adminstrator权限，请切换到administrator用户。

#### 4. 注册一个npm账号

> 注册地址：https://www.npmjs.com/

### 二、package编写

#### 1. 择一个文件夹，然后用命令行cd进去

初始化npm

> npm init

接下来就是一长串表单：

  - name：填写你这个包的名字，默认是你这个文件夹的名字。
    - **注意事项**
      - 防止包重名：
        解决方案：
        > 在命令行里面输入npm install 你要取的名字

        - 如果报错，那么很好，npm上没有跟你同名的包，你可以放心大胆地把包发布出去。
        - 如果成功下载下来了。。。那么很不幸，改名字吧。。。
  - version：你这个包的版本，默认是1.0.0
  - description：这个用一句话描述你的包是干嘛用的
  - entry point：入口文件，默认是Index.js，你也可以自己填写你自己的文件名
  - test command：测试命令，这个直接回车就好了，因为目前还不需要这个。
  - git repository：这个是git仓库地址，
    - 如果你的包是先放到github上或者其他git仓库里，这时候你的文件夹里面会存在一个隐藏的.git目录，npm会读到这个目录作为这一项的默认值。
    - 如果没有的话，直接回车继续。
  - keyword：这个是一个重点，这个关系到有多少人会搜到你的npm包。
    - 尽量使用贴切的关键字作为这个包的索引。

  - author：写你的账号或者你的github账号吧

  - license：这个直接回车，开源文件来着。。。

#### 2. 编写自己代码

  。。。。

#### 3. 编写README.md
README.md，一个给大家描述你的包的markdown文件。

详细介绍package的信息及使用方法。

### 三、package发布 (在package目录下面)

#### 1. 登录npm
> npm login

然后输入自己注册的用户名和密码。

如果没有用户名则添加npm用户

> npm adduser

#### 1. npm 发布
> npm publish

注意 :每一次发布新的一版，`version`版本要改变，不然npm会给我报错。一般情况下，一旦你要修改你已经发布后的代码，然后又要执行发布操作，务必到`package.json`里面，把`version`改一下，比如从1.0.0改为1.0.1，然后在执行`npm publish`，这样就可以成功发布了。

### 三、package查看
登录自己的npm官方账号，就可以看到自己发布的包。

## 参考文档
- [Mac 安装 nodejs （图文详细步骤）](https://blog.csdn.net/u010053344/article/details/50545304)
- [safeguardEagle](https://www.cnblogs.com/chengxs/p/7651653.html)
