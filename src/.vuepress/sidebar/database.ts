import { arraySidebar } from "vuepress-theme-hope";

export const database = arraySidebar([
  {
    text: "数据库",
    icon: "/database.svg",
    children: [
      {
        text: "MySQL",
        icon: "/mysql.svg",
        prefix: "mysql/",
        collapsible: true,
        children: "structure",
      },
      {
        text: "Redis",
        icon: "/redis.svg",
        prefix: "redis/",
        collapsible: true,
        children: "structure",
      },
      {
        text: "MongoDB",
        icon: "/mongodb.svg",
        link: "mongodb/",
      },
      {
        text: "Elasticsearch",
        icon: "/elasticsearch.svg",
        prefix: "elasticsearch/",
        collapsible: true,
        children: "structure",
      }
    ],
  }
]);
