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
            text: "面向对象",
            collapsible: true,
            children: [
              {
                text: "类和对象",
                link: "python类和对象"
              },
              {
                text: "魔法方法",
                link: "python魔法方法"
              }
            ]
          },
          {
            text: "函数",
            collapsible: true,
            children: [
              {
                text: "异常",
                link: "python异常",
              },
              {
                text: "内置函数",
                link: "python内置函数"
              },
              {
                text: "递归函数",
                link: "python递归函数"
              },
              {
                text: "匿名函数",
                link: "python匿名函数"
              },
              {
                text: "高阶函数",
                link: "python高阶函数"
              },
              {
                text: "装饰器",
                link: "python装饰器"
              },
              {
                text: "变量作用域",
                link: "python变量作用域"
              },
              {
                text: "内存管理",
                link: "python内存管理"
              },
            ]
          },
          {
            text: "多任务执行",
            collapsible: true,
            children: [
              {
                text: "多任务机制",
                link: "多任务机制",
              },
              {
                text: "线程池和进程池",
                link: "线程池和进程池"
              },
              {
                text: "asyncio异步IO",
                link: "asyncio异步IO"
              },
            ],
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


