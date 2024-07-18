import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from 'vuepress-theme-hope'
import { blogPlugin } from '@vuepress/plugin-blog'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    print: false,
    displayFooter: true,
    footer: "Powered by VuePress",
    logo: "/images/avatar.jpeg",
    navbar: ["/", "/article/", "/about"],
    blog: {
      name: "veizz",
      description: "这个博主正在找个web前端开发工程师的工作. Looking for a job as Web Frontend Engineer",
      medias: {
        github: "https://github.com/veizz",
        email: "mailto: veizzsmile@126.com",
      }
    },
    plugins: {
      blog: true,
    },
  }),
  title: "小网站",
  description: "一个平平无奇的小网站",
  pagePatterns: ["**/*.md", "!.vuepress", "!node_modules"],
  head: [["link", { rel: "icon", href: "/images/favicon.ico" }]],
});