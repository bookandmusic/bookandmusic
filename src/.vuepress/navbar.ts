import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "数据库",
    icon: "book",
    prefix:"/docs/",
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
    prefix:"/docs/",
    children: [
      {
        text: "Linux",
        link:"linux/",
      },
      {
        text: "Ansible",
        link:"ansible/",
      },
      {
        text: "Docker",
        link:"docker/",
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
