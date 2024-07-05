import { sidebar } from "vuepress-theme-hope";
import { frontend } from "./frontend.ts";
import { go } from "./go.ts";
import { database } from "./database.ts";
import { python } from "./python.ts";
import { docs } from "./docs.ts";
import { linux } from "./linux.ts";

export const defaultSidebar = sidebar({
  "/docs/": docs,
  "/docs/frontend/": frontend,
  "/docs/database/": database,
  "/docs/go/": go,
  "/docs/python/": python,
  "/docs/linux/": linux,
});
