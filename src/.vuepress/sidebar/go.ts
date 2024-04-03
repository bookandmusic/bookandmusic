import { arraySidebar } from "vuepress-theme-hope";

export const go = arraySidebar([
  {
    text: "Go",
    icon: "/go.svg",
    children: [
      {
        text: "基础语法",
        link: "base/"
      },
    ],
  }
]);


export const go_base = arraySidebar([
  {
    text: "基础语法",
    children: "structure",
  }
]);

