## 使用npm发布一个包

npm 越来月流行，那么如何使用npm发布一个package? 这个是值得我们思考的问题。

经过网上查找实现方法，并自己实践了一下，发现也并不是特别难的事情。

### 一、准备工作 -- 安装nodeJs并配置 npm

#### 1. 安装nodeJs

**step 1:**  
访问nodejs官网，点击稳定版，并下载[https://nodejs.org/](https://nodejs.org)

**step 2:**  
双击刚下载的文件，按步骤默认安装就行

**step 3:**  
安装完成后打开终端，输入
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

#### 2. npm 发布package
> npm publish 包名

#### 3. npm更新发布后的包
事实上npm更新包和发布包的命令是一样的，都是
> npm publish

`不同之处在于，你需要修改包的版本`

**步骤是：**
- 修改包的版本（package.json里的version字段）
- npm publish

#### 4. 利用npm撤销发布package
取消发布包可能并不像你想象得那么容易，这种操作是受到诸多限制的，撤销发布的包被认为是一种不好的行为。

试想一下你撤销了发布的包[假设它已经在社区内有了一定程度的影响]，这对那些已经深度使用并依赖你发布的包的团队是件多么崩溃的事情！

> npm unpublish 包名

**注意**
- 根据规范，只有在发包的24小时内才允许撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours）
- 即使你撤销了发布的包，发包的时候也不能再和被撤销的包的名称和版本重复了（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

#### 5. 利用npm安装包
npm安装的方式——`本地安装和全局安装`

**什么时候用本地／全局安装？**
- 当你试图安装命令行工具的时候，例如 grunt CLI的时候，使用全局安装

> 全局安装的方式：npm install -g 模块名称

- 当你试图通过npm install 某个模块，并通过require('XXX')的方式引入的时候，使用本地安装

> 本地安装的方式：npm install 模块名称

#### 6. 利用npm删除包
- 删除全局模块
> npm uninstall -g `<package>`

- 删除本地模块
> npm uninstall 模块

删除本地模块时你应该思考的问题：

**是否将在package.json上的相应依赖信息也消除？**

- **npm uninstall 模块：**删除模块，但不删除模块留在package.json中的对应信息

- **npm uninstall 模块 --save** 删除模块，同时删除模块留在package.json中dependencies下的对应信息

- **npm uninstall 模块 --save-dev** 删除模块，同时删除模块留在package.json中devDependencies下的对应信息

### 四、package查看
登录自己的npm官方账号，就可以看到自己发布的包。

## 参考文档
- [Mac 安装 nodejs （图文详细步骤）](https://blog.csdn.net/u010053344/article/details/50545304)
- [safeguardEagle](https://www.cnblogs.com/chengxs/p/7651653.html)
- [【npm】利用npm安装/删除/发布/更新/撤销发布包](https://www.cnblogs.com/penghuwan/p/6973702.html#_label2)
