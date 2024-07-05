import { arraySidebar } from "vuepress-theme-hope";

export const go = arraySidebar([
  {
    text: "Go",
    icon: "/go.svg",
    children: [
      {
        text: "基础语法",
        collapsible: true,
        prefix: "base/",
        children: "structure"
      },
    ],
  }
]);
