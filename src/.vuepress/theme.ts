import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import { defaultSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://bookandmusic.cn",

  author: {
    name: "Mr.Liu",
    url: "https://bookandmusic.cn",
    email: "lsf_2012@163.com"
  },
  blog: {
    // avatar:"",
    roundAvatar: true,
  },
  iconAssets: "fontawesome-with-brands",

  logo: "/logo.png",

  pure: true,

  favicon: "/logo.png",

  repo: "bookandmusic/docs",

  docsRepo: "bookandmusic/docs",
  docsDir: "src",
  docsBranch: "master",

  // navbar
  navbar,
  // sidebar
  sidebar: defaultSidebar,

  footer: '<a href="http://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">备案号: 京ICP备2021028097号</a> | <a href="/about/">关于网站</a>',

  displayFooter: true,

  breadcrumb: false,

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    docsearch:{
      appId: 'C9YU2PEVXB',
      apiKey: '5eef31dc0ce26cb714532aa51f41b4d1',
      indexName: 'bookandmusic',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    },
    blog: {
      excerptLength: 100,
    },
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "bookandmusic/comments",
      repoId: "R_kgDOJf0cDA",
      category: "Announcements",
      categoryId: "DIC_kwDOJf0cDM4CWUUJ",
      lazyLoading: true,
    },
    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      // align: true,
      // attrs: true,
      // codetabs: true,
      // component: true,
      // demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      // stylize: [
      //   {
      //     matcher: "Recommended",
      //     replacer: ({ tag }) => {
      //       if (tag === "em")
      //         return {
      //           tag: "Badge",
      //           attrs: { type: "tip" },
      //           content: "Recommended",
      //         };
      //     },
      //   },
      // ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
  },
});
