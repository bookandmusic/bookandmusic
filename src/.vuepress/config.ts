import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Mr.Liu.Note",
  description: "个人学习笔记",

  theme,
  // Enable it with pwa
  shouldPrefetch: false,
  bundler: viteBundler({
    viteOptions: {
      assetsInclude: ['**/*.awebp']
    },
    vuePluginOptions: {},
  }),
});
