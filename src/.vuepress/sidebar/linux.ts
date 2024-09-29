import { arraySidebar } from "vuepress-theme-hope";

export const linux = arraySidebar([
  {
    text: "Linux",
    icon: "/linux.svg",
    children: [
      {
        text: "常用命令",
        prefix: "command/",
        icon: "/command.svg",
        collapsible: true,
        children: "structure",
      },
      {
        text: "资源管理",
        prefix: "resource/",
        icon: "/resource.svg",
        collapsible: true,
        children: "structure",
      },
      {
        text: "服务管理",
        prefix: "service/",
        icon:"/system-service.svg",
        collapsible: true,
        children: "structure",
      },
      {
        text: "组件",
        icon:"/component.svg",
        prefix: "components/",
        collapsible: true,
        children: [
          {
            text: "Git",
            icon:"/git.svg",
            prefix: "git/",
            collapsible: true,
            children: "structure",
          },
          {
            text: "Nginx",
            icon:"/nginx.svg",
            prefix: "nginx/",
            collapsible: true,
            children: "structure",
          },
          {
            text: "Ansible",
            icon: "/ansible.svg",
            prefix: "ansible/",
            collapsible: true,
            children: "structure",
          },
          {
            text: "Docker",
            icon: "/docker.svg",
            prefix: "docker/",
            collapsible: true,
            children: "structure",
          },
          {
            text: "Kubernetes",
            icon:"/kubernetes.svg",
            prefix: "kubernetes/",
            collapsible: true,
            children: "structure",
          },
        ],
      },
    ],
  }
]);
