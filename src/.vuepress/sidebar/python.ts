import { arraySidebar } from "vuepress-theme-hope";

export const python = arraySidebar([
  {
    text: "Python",
    icon: "/python.svg",
    children: [
      {
        text: "环境配置",
        prefix:"env/",
        collapsible: true,
        children: "structure",
      },
      {
        text: "基础语法",
        prefix: "base/",
        collapsible: true,
        children: [
          {
            text: "函数",
            collapsible: true,
            prefix:"func/",
            children: "structure",
          },
          {
            text: "面向对象",
            collapsible: true,
            prefix:"object/",
            children: "structure",
          },
          {
            text: "多任务执行",
            collapsible: true,
            prefix:"multitask/",
            children: "structure",
          }
        ],
      },
      {
        text: "常用模块",
        prefix: "module/",
        collapsible: true,
        children: "structure",
      },
      {
        text: "编程案例",
        prefix: "code/",
        collapsible: true,
        children: "structure",
      },
      {
        text: "web项目",
        prefix: "web/",
        collapsible: true,
        children: [
          {
            text: "Django学习笔记",
            collapsible: true,
            prefix: "django/",
            children: [
              {
                text: "Django基础",
                collapsible: true,
                prefix: "django-base/",
                children: "structure",
              },
              {
                text: "Django功能模块",
                collapsible: true,
                prefix: "django-module/",
                children: "structure",
              },
              {
                text: "DRF基础",
                collapsible: true,
                prefix: "drf-base/",
                children: "structure",
              },
              {
                text: "DRF功能模块",
                collapsible: true,
                prefix: "drf-module/",
                children: "structure",
              },
            ]
          },
          {
            text: "Flask学习笔记",
            collapsible: true,
            prefix: "flask/",
            children: [
              {
                text: "模板开发",
                collapsible: true,
                prefix: "template/",
                children: "structure",
              },
              {
                text: "接口开发",
                collapsible: true,
                prefix: "restful/",
                children: "structure",
              },
            ]
          }
        ]
      },
    ],
  }
]);


