import { arraySidebar } from "vuepress-theme-hope";

export const go = arraySidebar([
  {
    text: "Go",
    icon: "/go.svg",
    children: [
      {
        text: "环境配置",
        collapsible: true,
        prefix: "env/",
        children: "structure",
      },
      {
        text: "基础语法",
        collapsible: true,
        prefix: "base/",
        children: "structure",
      },
    ],
  }
]);
