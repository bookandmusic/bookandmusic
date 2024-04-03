import { arraySidebar } from "vuepress-theme-hope";

export const linux = arraySidebar([
  {
    text: "Linux",
    icon: "/linux.svg",
    children:[
      {
        text: "常用命令",
        link: "command/",
      },
      {
        text: "服务管理",
        link: "service/",
      },
      {
        text: "组件",
        link: "components/",
      },
      {
        text: "常用软件",
        link: "software/",
      },
      {
        text: "文档工具",
        link: "markdown/",
      },
    ],
  }
]);



export const linux_command = arraySidebar([
  {
    text: "常用命令",
    children: "structure",
  }
]);

export const linux_service = arraySidebar([
  {
    text: "服务管理",
    children: "structure",
  }
]);

export const linux_component = arraySidebar([
  {
    text: "组件",
    children: "structure",
  }
]);

export const linux_markdown = arraySidebar([
  {
    text: "文档工具",
    children: "structure",
  }
]);

export const linux_software = arraySidebar([
  {
    text: "常用软件",
    children: "structure",
  }
]);