import { sidebar } from "vuepress-theme-hope";
import { ansible } from "./ansible.js";
import { docker } from "./docker.js";
import { frontend } from "./frontend.js";
import { go, go_base } from "./go.js";
import { mysql } from "./mysql.js";
import { mongodb } from "./mongodb.js";
import { redis } from "./redis.js";
import { elasticsearch } from "./elasticsearch.js";
import { python, python_env, python_base, python_module, python_code, python_web } from "./python.js";
import { docs } from "./docs.js";
import { linux, linux_command, linux_markdown, linux_service, linux_software, linux_component } from "./linux.js";

export const defaultSidebar = sidebar({
  "/docs/": docs,
  "/docs/ansible/": ansible,
  "/docs/docker/": docker,
  "/docs/frontend/": frontend,
  "/docs/mysql/": mysql,
  "/docs/mongodb/": mongodb,
  "/docs/redis/": redis,
  "/docs/elasticsearch/": elasticsearch,
  "/docs/go/": go,
  "/docs/go/base/": go_base,
  "/docs/python/": python,
  "/docs/python/env/": python_env,
  "/docs/python/base/": python_base,
  "/docs/python/module/": python_module,
  "/docs/python/code/": python_code,
  "/docs/python/web/": python_web,
  "/docs/linux/": linux,
  "/docs/linux/command/": linux_command,
  "/docs/linux/markdown/": linux_markdown,
  "/docs/linux/service/": linux_service,
  "/docs/linux/components/": linux_component,
  "/docs/linux/software/": linux_software,
});
