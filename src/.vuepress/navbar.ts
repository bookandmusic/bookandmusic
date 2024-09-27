import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "博客",
    icon: "blog",
    prefix:"/category",
    children: [
      {
        text: "Python",
        link:"python/",
      },
      {
        text: "Go",
        link:"go/",
      },
      {
        text: "数据库",
        link:"数据库/",
      },
      {
        text: "算法",
        link:"算法/",
      },
      {
        text: "Web开发",
        link:"web开发/",
      },
      {
        text: "网络",
        link:"网络/",
      },
      {
        text: "工具软件",
        link:"工具软件/",
      },
      {
        text: "系统操作",
        link:"系统操作/",
      },
    ],
  },
  {
    text: "数据库",
    icon: "book",
    prefix:"/docs/database/",
    children: [
      {
        text: "MySQL",
        link:"mysql/",
      },
      {
        text: "Redis",
        link:"redis/",
      },
      {
        text: "MongoDB",
        link:"mongodb/",
      },
      {
        text: "Elasticsearch",
        link:"elasticsearch/",
      },
    ],
  },
  {
    text: "Linux运维",
    icon: "book",
    prefix:"/docs/linux",
    children: [
      {
        text: "Linux命令",
        link:"command/",
      },
      {
        text: "资源管理",
        link:"resource/",
      },
      {
        text: "服务管理",
        link:"service/",
      },
      {
        text: "组件",
        link:"components/",
      },
    ],
  },
  {
    text: "Go",
    icon: "book",
    prefix: "/docs/go/",
    children: [
      {
        text: "基础语法",
        link:"base/",
      },
    ],
  },
  {
    text: "Python",
    icon: "book",
    prefix: "/docs/python/",
    children: [
      {
        text: "环境配置",
        link:"env/",
      },
      {
        text: "基础语法",
        link:"base/",
      },
      {
        text: "常用模块",
        link:"module/",
      },
      {
        text: "编程案例",
        link:"code/",
      },
      {
        text: "web项目",
        link:"web/",
      },
    ],
  },
  {
    text: "前端",
    icon: "book",
    link:"/docs/frontend/"
  },
]);
