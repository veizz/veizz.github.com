import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,b as e}from"./app-DoMxC1ve.js";const i={},l=e(`<h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意"><span>注意</span></a></h2><p>本文档结合官方文档一起阅读，效果更好 <a href="http://reactnative.cn/docs/0.30/integration-with-existing-apps.html" target="_blank" rel="noopener noreferrer">中文翻译，0.30.0版</a></p><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2><p>在原来的项目里面添加react-native相关依赖（lib），然后OC引入一个RCTRootView，在这个RCTRootView里面引入react-native的代码。（这个view是react-native提供的lib，可以使用js代码初始化。） 所以按照这个思路下来，需要</p><ul><li>先准备好react-native开发环境</li><li>准备可以初始化RCTRootView的js代码（编译代码）</li><li>准备cocoapods环境</li><li>使用cocoapods添加react-native依赖</li><li>OC代码中引入RCTRootView，编译调试</li></ul><h2 id="思路拆分" tabindex="-1"><a class="header-anchor" href="#思路拆分"><span>思路拆分</span></a></h2><h3 id="rn环境准备-安装node" tabindex="-1"><a class="header-anchor" href="#rn环境准备-安装node"><span>RN环境准备，安装node</span></a></h3><p>准备react-native 开发环境（安装node），node自带npm，npm是node的包管理工具。用以安装react, react-native等包</p><div class="language-lang=shell line-numbers-mode" data-highlighter="shiki" data-ext="lang=shell" data-title="lang=shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># brew是mac下的一个包管理工具，具体参考http://brew.sh/</span></span>
<span class="line"><span>brew install node</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="准备js代码" tabindex="-1"><a class="header-anchor" href="#准备js代码"><span>准备js代码</span></a></h3><div class="language-lang=shell line-numbers-mode" data-highlighter="shiki" data-ext="lang=shell" data-title="lang=shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 在项目目录下创建rnComponents文件夹（可以是任意目录，推荐是跟oc项目相关的目录）</span></span>
<span class="line"><span>mkdir rnComponents</span></span>
<span class="line"><span>cd rnComponents</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建node项目，自动生成package.json</span></span>
<span class="line"><span>npm init</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在下面这一步，可能会遇到问题，不能成功安装react, react-native的包。需要科学上网。</span></span>
<span class="line"><span># 一般的解决办法是使用国内的镜像</span></span>
<span class="line"><span># npm config set registry https://registry.npm.taobao.org &amp;&amp; npm install react react-native --save</span></span>
<span class="line"><span>npm install react react-native --save</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建index.ios.js文件</span></span>
<span class="line"><span>touch index.ios.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在index.ios.js中添加示例代码</span></span>
<span class="line"><span># 示例代码省略，请参考官网</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动服务</span></span>
<span class="line"><span>node node_modules/react-native/local-cli/cli.js start</span></span>
<span class="line"><span># 之后在浏览器里面访问http://localhost:8081/index.ios.bundle?platform=ios</span></span>
<span class="line"><span># 等一会儿之后，可以看到很多的js代码，到此时，已经准备好js</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 还可以把这条指令添加到package.json里面</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;start&quot;: &quot;node node_modules/react-native/local-cli/cli.js start&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span># 之后就可以使用npm start来启动服务</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖"><span>添加依赖</span></a></h3><p>官方推荐使用<code>cocoapods</code>来管理依赖，如下是推荐的步骤</p><div class="language-lang=shell line-numbers-mode" data-highlighter="shiki" data-ext="lang=shell" data-title="lang=shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 安装 cocoapods</span></span>
<span class="line"><span>sudo gem install cocoapods</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果mac上安装的ruby版本过低（低于2.2.0）的话，需要安装新版本的ruby。 推荐使用rvm（或者自行查询ruby版本更新方法）</p><p><code>curl -L get.rvm.io | bash -s stable</code> 然后安装2.3.1版本的ruby <code>rvm install 2.3.1 </code> 之后在命令行输入<code>ruby -v</code>可以看看版本号 ruby 升级完成后，再次执行<code>sudo gem install cocoapods</code></p></blockquote><p>创建cocoapods配置文件 到ios的项目代码目录，执行<code>pod init</code></p><p>cocoapods安装依赖 修改Podfile，文件中如下内容：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># =====================================</span></span>
<span class="line"><span># Podfile</span></span>
<span class="line"><span>project &#39;Myapp.xcodeproj&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Uncomment this line to define a global platform for your project</span></span>
<span class="line"><span># platform :ios, &#39;9.0&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># target 跟OC工程的target相关</span></span>
<span class="line"><span>target &#39;Myapp&#39; do</span></span>
<span class="line"><span>  # Uncomment this line if you&#39;re using Swift or would like to use dynamic frameworks</span></span>
<span class="line"><span>  # use_frameworks!</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Pods for Myapp</span></span>
<span class="line"><span>  # path配置的路径，跟上一步执行npm init的目录对应。</span></span>
<span class="line"><span>  # 如果npm init在/a/b/c/</span></span>
<span class="line"><span>  # 那下面这个目录对应的是/a/b/c/node_modules/react-native</span></span>
<span class="line"><span>  pod &#39;React&#39;, :path =&gt; &#39;rnComponents/node_modules/react-native&#39;, :subspecs =&gt; [</span></span>
<span class="line"><span>    &#39;Core&#39;,</span></span>
<span class="line"><span>    &#39;RCTText&#39;,</span></span>
<span class="line"><span>    &#39;RCTWebSocket&#39;, # needed for debugging</span></span>
<span class="line"><span>    &#39;RCTImage&#39;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  target &#39;MyappTests&#39; do</span></span>
<span class="line"><span>    inherit! :search_paths</span></span>
<span class="line"><span>    # Pods for testing</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  target &#39;MyappUITests&#39; do</span></span>
<span class="line"><span>    inherit! :search_paths</span></span>
<span class="line"><span>    # Pods for testing</span></span>
<span class="line"><span>  end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>end</span></span>
<span class="line"><span># file end=====================================</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lang=shell line-numbers-mode" data-highlighter="shiki" data-ext="lang=shell" data-title="lang=shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 执行pod install, 进行安装</span></span>
<span class="line"><span>pod install</span></span>
<span class="line"><span># 这一步需要等很久，建议科学上网</span></span>
<span class="line"><span># 这一步完成之后，生成xcworkspace项目，使用xcode打开</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="解决build-setting问题" tabindex="-1"><a class="header-anchor" href="#解决build-setting问题"><span>解决Build Setting问题</span></a></h4><p>引入pods后需要在Build Setting的Other Linker Flags和Library Search Paths下面都加入<code>$(inherited)</code>，否则会报错</p><h3 id="在oc的项目中-引入rctrootview" tabindex="-1"><a class="header-anchor" href="#在oc的项目中-引入rctrootview"><span>在OC的项目中，引入RCTRootView</span></a></h3><p>首先打开项目名带<code>.xcworkspace</code>的文件，Pods和项目名应在平级目录中</p><p>在项目中创建一个继承于<code>UIView</code>的类，名字自定，这里叫<code>ReactView</code></p><div class="language-lang=oc line-numbers-mode" data-highlighter="shiki" data-ext="lang=oc" data-title="lang=oc" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// ReactView.h</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#import &lt;UIKit/UIKit.h&gt;</span></span>
<span class="line"><span>@interface ReactView : UIView</span></span>
<span class="line"><span>@end</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个视图控制器</p><div class="language-lang=oc line-numbers-mode" data-highlighter="shiki" data-ext="lang=oc" data-title="lang=oc" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// ViewController.m</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@interface ViewController ()</span></span>
<span class="line"><span>@property (weak, nonatomic) ReactView *reactView;</span></span>
<span class="line"><span>@end</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在视图控制器里面添加RCTRootView，首先先用<code>index.ios.bundle</code>的URI来初始化<code>RCTRootView</code></p><div class="language-lang=oc line-numbers-mode" data-highlighter="shiki" data-ext="lang=oc" data-title="lang=oc" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 这里是js传过来的URL</span></span>
<span class="line"><span># OC从这个url拉取js代码，解析并渲染</span></span>
<span class="line"><span>NSURL *jsCodeLocation = [NSURL URLWithString:@&quot;http://localhost:8081/index.ios.bundle?platform=ios&quot;];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#核心代码，初始化一个RCTRootView。moduleName是js模块的名字，Properties可以传递字典类型的属性给js</span></span>
<span class="line"><span>RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@&quot;SimpleApp&quot; initialProperties:nil launchOptions:nil];</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新app-transport-security" tabindex="-1"><a class="header-anchor" href="#更新app-transport-security"><span>更新App Transport Security</span></a></h3><p>在iOS 9以上的系统中，除非明确指明，否则应用无法通过http协议连接到localhost主机，需要在<code>Info.plist</code>文件中将<code>localhost</code>列为App Transport Security的例外</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>&lt;key&gt;NSAppTransportSecurity&lt;/key&gt;</span></span>
<span class="line"><span>&lt;dict&gt;</span></span>
<span class="line"><span>    &lt;key&gt;NSExceptionDomains&lt;/key&gt;</span></span>
<span class="line"><span>    &lt;dict&gt;</span></span>
<span class="line"><span>        &lt;key&gt;localhost&lt;/key&gt;</span></span>
<span class="line"><span>        &lt;dict&gt;</span></span>
<span class="line"><span>            &lt;key&gt;NSTemporaryExceptionAllowsInsecureHTTPLoads&lt;/key&gt;</span></span>
<span class="line"><span>            &lt;true/&gt;</span></span>
<span class="line"><span>        &lt;/dict&gt;</span></span>
<span class="line"><span>    &lt;/dict&gt;</span></span>
<span class="line"><span>&lt;/dict&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="操作完成后的目录结构" tabindex="-1"><a class="header-anchor" href="#操作完成后的目录结构"><span>操作完成后的目录结构</span></a></h3><div class="language-lang=shell line-numbers-mode" data-highlighter="shiki" data-ext="lang=shell" data-title="lang=shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── Myapp</span></span>
<span class="line"><span>├── Myapp.xcodeproj</span></span>
<span class="line"><span>│   ├── project.pbxproj</span></span>
<span class="line"><span>│   ├── project.xcworkspace</span></span>
<span class="line"><span>│   └── xcuserdata</span></span>
<span class="line"><span>├── Myapp.xcworkspace</span></span>
<span class="line"><span>│   ├── contents.xcworkspacedata</span></span>
<span class="line"><span>│   └── xcuserdata</span></span>
<span class="line"><span>├── MyappTests</span></span>
<span class="line"><span>│   ├── MyappTests.m</span></span>
<span class="line"><span>│   └── Info.plist</span></span>
<span class="line"><span>├── MyappUITests</span></span>
<span class="line"><span>│   ├── MyappUITests.m</span></span>
<span class="line"><span>│   └── Info.plist</span></span>
<span class="line"><span>├── Podfile</span></span>
<span class="line"><span>├── Podfile.lock</span></span>
<span class="line"><span>├── Pods</span></span>
<span class="line"><span>│   ├── Headers</span></span>
<span class="line"><span>│   ├── Local Podspecs</span></span>
<span class="line"><span>│   ├── Manifest.lock</span></span>
<span class="line"><span>│   ├── Pods.xcodeproj</span></span>
<span class="line"><span>│   └── Target Support Files</span></span>
<span class="line"><span>└── rnComponents</span></span>
<span class="line"><span>    ├── index.ios.js</span></span>
<span class="line"><span>    ├── node_modules</span></span>
<span class="line"><span>    ├── package.json</span></span>
<span class="line"><span>    └── readme.md</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编译执行" tabindex="-1"><a class="header-anchor" href="#编译执行"><span>编译执行</span></a></h3><p>在xcode中编译代码，并执行，就可以看到效果了</p>`,36),p=[l];function d(c,t){return a(),n("div",null,p)}const v=s(i,[["render",d],["__file","2016-09-17-react-native-with-OC-notes.html.vue"]]),h=JSON.parse('{"path":"/posts/2016-09-17-react-native-with-OC-notes.html","title":"react-native和已有OC项目混合开发","lang":"zh-CN","frontmatter":{"v_pageid":"3143a288c57e1b1add7767a83be774b9","author":"veizz,peggyw1217","title":"react-native和已有OC项目混合开发","date":"2016-09-17T14:52:56.000Z","categories":"react-native","head":"react-native和已有OC项目混合开发,环境搭建简单介绍,搭配官方文档阅读更佳"},"headers":[{"level":2,"title":"注意","slug":"注意","link":"#注意","children":[]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"思路拆分","slug":"思路拆分","link":"#思路拆分","children":[{"level":3,"title":"RN环境准备，安装node","slug":"rn环境准备-安装node","link":"#rn环境准备-安装node","children":[]},{"level":3,"title":"准备js代码","slug":"准备js代码","link":"#准备js代码","children":[]},{"level":3,"title":"添加依赖","slug":"添加依赖","link":"#添加依赖","children":[]},{"level":3,"title":"在OC的项目中，引入RCTRootView","slug":"在oc的项目中-引入rctrootview","link":"#在oc的项目中-引入rctrootview","children":[]},{"level":3,"title":"更新App Transport Security","slug":"更新app-transport-security","link":"#更新app-transport-security","children":[]},{"level":3,"title":"操作完成后的目录结构","slug":"操作完成后的目录结构","link":"#操作完成后的目录结构","children":[]},{"level":3,"title":"编译执行","slug":"编译执行","link":"#编译执行","children":[]}]}],"git":{"createdTime":1474098236000,"updatedTime":1721271134000,"contributors":[{"name":"veizz","email":"veizzsmile@gmail.com","commits":3}]},"readingTime":{"minutes":3.98,"words":1194},"filePathRelative":"posts/2016-09-17-react-native-with-OC-notes.md","localizedDate":"2016年9月17日","excerpt":"<h2>注意</h2>\\n<p>本文档结合官方文档一起阅读，效果更好\\n<a href=\\"http://reactnative.cn/docs/0.30/integration-with-existing-apps.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">中文翻译，0.30.0版</a></p>\\n<h2>思路</h2>\\n<p>在原来的项目里面添加react-native相关依赖（lib），然后OC引入一个RCTRootView，在这个RCTRootView里面引入react-native的代码。（这个view是react-native提供的lib，可以使用js代码初始化。）\\n所以按照这个思路下来，需要</p>"}');export{v as comp,h as data};
