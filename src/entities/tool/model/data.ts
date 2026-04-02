import TablerBrandCSS3 from "~icons/tabler/brand-css3";
import TablerBrandGit from "~icons/tabler/brand-git";
import TablerBrandHTML5 from "~icons/tabler/brand-html5";
import TablerBrandJavaScript from "~icons/tabler/brand-javascript";
import TablerBrandMongoDB from "~icons/tabler/brand-mongodb";
import TablerBrandNodeJS from "~icons/tabler/brand-nodejs";
import TablerBrandPHP from "~icons/tabler/brand-php";
import TablerBrandReact from "~icons/tabler/brand-react";
import TablerBrandVue from "~icons/tabler/brand-vue";
import TablerSQL from "~icons/tabler/sql";
import type { Tool } from "./types";

export const tools: Tool[] = [
  {
    icon: TablerBrandHTML5,
    label: "HTML",
    category: "Fundamentals"
  },
  {
    icon: TablerBrandCSS3,
    label: "CSS",
    category: "Fundamentals"
  },
  {
    icon: TablerBrandJavaScript,
    label: "JS",
    category: "Fundamentals"
  },
  {
    icon: TablerSQL,
    label: "SQL",
    category: "Backend"
  },
  {
    icon: TablerBrandMongoDB,
    label: "MongoDB",
    category: "Backend"
  },
  {
    icon: TablerBrandReact,
    label: "React",
    category: "Frontend"
  },
  {
    icon: TablerBrandVue,
    label: "Vue",
    category: "Frontend"
  },
  {
    icon: TablerBrandNodeJS,
    label: "Node",
    category: "Backend"
  },
  {
    icon: TablerBrandPHP,
    label: "PHP",
    category: "Backend"
  },
  {
    icon: TablerBrandGit,
    label: "Git",
    category: "Others"
  },
]
