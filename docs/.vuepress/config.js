import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { blog, hopeTheme } from 'vuepress-theme-hope'
import { blogPlugin } from '@vuepress/plugin-blog'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    print: false,
    displayFooter: true,
    footer: "Powered by VuePress",
    logo: "/images/avatar.jpeg",
    navbar: ["/posts/", "/about"],
    blog: {
      name: "veizz",
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