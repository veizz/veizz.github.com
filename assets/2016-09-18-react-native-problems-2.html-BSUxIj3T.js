import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,b as n}from"./app-DoMxC1ve.js";const e={},l=n(`<h3 id="当android的viewpagerandroid里的page数量不固定的时候" tabindex="-1"><a class="header-anchor" href="#当android的viewpagerandroid里的page数量不固定的时候"><span>当android的viewpagerandroid里的page数量不固定的时候</span></a></h3><p>可能会遇到问题。比如说这个： <code>The specified child already has a parent. You must call removeView() on the child&#39;s parent first</code></p><p>会报错的代码类似如下结构：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">            {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">                exists</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;xxx&lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决办法：修改成如下结构就好了</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> exists</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">  this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">_genExists</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> this</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">_genNotExists</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">_genExists</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;xxx&lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">Text</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">_genNotExists</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">View</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;">IndicatorViewPager</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="异步操作-组件已经被unmount" tabindex="-1"><a class="header-anchor" href="#异步操作-组件已经被unmount"><span>异步操作，组件已经被unmount</span></a></h3><p>在有些时候，组件会被unmount，而有一些异步的请求，会在组件umount之前发出，在umount之后完成，这个时候异步请求的回调函数会执行，然后有一些setState的操作 这样的setState操作会报一个warning: <code>setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.</code></p><p>解决办法： 在<code>componentWillMount</code>里面，设置<code>this._isMounted = true;</code> 在<code>componentWillUnmount</code>里面，设置<code>this._isMounted = false;</code> 然后在回调函数里面判断<code>this._isMounted</code>的值来解决</p><blockquote><p>据说不推荐isMounted()函数</p></blockquote><hr><h3 id="moment时间处理类-不能正确引入-locale-代码" tabindex="-1"><a class="header-anchor" href="#moment时间处理类-不能正确引入-locale-代码"><span>moment时间处理类，不能正确引入 locale 代码</span></a></h3><p>在使用momentjs进行时间处理的时候，有时候需要国际化配置，使用本地语言。这时需要导入locale文件</p><p>解决办法：</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> moment</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;moment&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;moment/locale/zh-cn&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// some other code ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">moment</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">locale</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;zh-cn&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="ios和android共用react-native代码的时候-开发协作" tabindex="-1"><a class="header-anchor" href="#ios和android共用react-native代码的时候-开发协作"><span>iOS和android共用react-native代码的时候，开发协作</span></a></h3><p>使用react-native的代码，主要是因为，同样的代码可以同时在android和iOS平台下使用，那么，跟原来已经有的android和iOS项目混合开发的时候，怎么样协作呢？</p><p>解决办法： 使用git subtree, 参考<a href="https://segmentfault.com/a/1190000003969060" target="_blank" rel="noopener noreferrer">这个链接</a></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 添加subtree</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> path-to-rn-project.git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 提交到subtree</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> path-to-rn-project.git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 从subtree更新</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> path-to-rn-project.git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 还可以给url起个别名</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> remote</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> the_alias</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> path-to-rn-project.git</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 之后就可以使用别名来操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> the_alias</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> the_alias</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> subtree</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> pull</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --prefix=rnComponents</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> the_alias</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> master</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="settimeout-setinterval的使用" tabindex="-1"><a class="header-anchor" href="#settimeout-setinterval的使用"><span>setTimeout, setInterval的使用</span></a></h3><p>使用<code>setTimeout</code>, <code>setInterval</code>等是非常危险的，如果在组件umount的时候忘记把它们清理掉的话。</p><p>解决办法： 在较早的版本中，使用<a href="https://github.com/reactjs/react-timer-mixin" target="_blank" rel="noopener noreferrer">react-timer-mixin</a>来解决问题 在当前的版本中（主要是当前使用ES6语法），在componentWillUmount函数里，调用clearTimeout, clearInterval等做清理工作</p>`,25),t=[l];function h(k,p){return a(),i("div",null,t)}const g=s(e,[["render",h],["__file","2016-09-18-react-native-problems-2.html.vue"]]),c=JSON.parse(`{"path":"/posts/2016-09-18-react-native-problems-2.html","title":"react-native开发中遇到的一些坑（二）","lang":"zh-CN","frontmatter":{"v_pageid":"ddb5c52223c238ccf228f0c285af0559","author":"veizz","title":"react-native开发中遇到的一些坑（二）","date":"2016-09-18T20:50:56.000Z","categories":"react-native","head":"产品已经上线，在app中有一个较大的模块使用react-native完成，记录了在开发过程中遇到的一些坑及解决办法"},"headers":[{"level":3,"title":"当android的viewpagerandroid里的page数量不固定的时候","slug":"当android的viewpagerandroid里的page数量不固定的时候","link":"#当android的viewpagerandroid里的page数量不固定的时候","children":[]},{"level":3,"title":"异步操作，组件已经被unmount","slug":"异步操作-组件已经被unmount","link":"#异步操作-组件已经被unmount","children":[]},{"level":3,"title":"moment时间处理类，不能正确引入 locale 代码","slug":"moment时间处理类-不能正确引入-locale-代码","link":"#moment时间处理类-不能正确引入-locale-代码","children":[]},{"level":3,"title":"iOS和android共用react-native代码的时候，开发协作","slug":"ios和android共用react-native代码的时候-开发协作","link":"#ios和android共用react-native代码的时候-开发协作","children":[]},{"level":3,"title":"setTimeout, setInterval的使用","slug":"settimeout-setinterval的使用","link":"#settimeout-setinterval的使用","children":[]}],"git":{"createdTime":1474205326000,"updatedTime":1721272368000,"contributors":[{"name":"veizz","email":"veizzsmile@gmail.com","commits":4}]},"readingTime":{"minutes":2.29,"words":688},"filePathRelative":"posts/2016-09-18-react-native-problems-2.md","localizedDate":"2016年9月18日","excerpt":"<h3>当android的viewpagerandroid里的page数量不固定的时候</h3>\\n<p>可能会遇到问题。比如说这个：\\n<code>The specified child already has a parent. You must call removeView() on the child's parent first</code></p>\\n<p>会报错的代码类似如下结构：</p>\\n<div class=\\"language-js line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"js\\" data-title=\\"js\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\">render</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(){</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">    return</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">(</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        &lt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">IndicatorViewPager</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            &lt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            &lt;/</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#C678DD\\">            {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#E06C75\\">                exists</span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\"> ?</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &lt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;&lt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">Text</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;xxx&lt;/</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">Text</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;&lt;/</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt; </span><span style=\\"--shiki-light:#D73A49;--shiki-dark:#C678DD\\">:</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\"> null</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#C678DD\\">            }</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            &lt;</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">            &lt;/</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">View</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">        &lt;/</span><span style=\\"--shiki-light:#005CC5;--shiki-dark:#E5C07B\\">IndicatorViewPager</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    )</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}`);export{g as comp,c as data};