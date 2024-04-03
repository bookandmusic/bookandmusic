import { arraySidebar } from "vuepress-theme-hope";

export const docs = arraySidebar([
  {
    text: "文档",
    icon: "/docs.svg",
    children: [
      {
        text: "Linux",
        icon: "/linux.svg",
        link: "/docs/linux"
      },
      {
        text: "MySQL",
        icon: "/mysql.svg",
        link: "/docs/mysql"
      },
      {
        text: "Ansible",
        icon: "/ansible.svg",
        link: "/docs/ansible"
      },
      {
        text: "Docker",
        icon: "/docker.svg",
        link:"/docs/docker/",
      },
      {
        text: "Go",
        icon: "/go.svg",
        link: "/docs/go"
      },
      {
        text: "Python",
        icon: "/python.svg",
        link: "/docs/python"
      },
      {
        text: "前端",
        icon: "/vuejs.svg",
        link: "/docs/frontend/"
      },
    ],
  }
]);