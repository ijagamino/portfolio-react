import TablerBrandCSS3 from "~icons/tabler/brand-css3";
import TablerBrandLaravel from "~icons/tabler/brand-laravel";
import TablerBrandGit from "~icons/tabler/brand-git";
import TablerBrandMySQL from "~icons/tabler/brand-mysql";
import TablerBrandHTML5 from "~icons/tabler/brand-html5";
import TablerBrandJavaScript from "~icons/tabler/brand-javascript";
import TablerBrandMongoDB from "~icons/tabler/brand-mongodb";
import TablerBrandNodeJS from "~icons/tabler/brand-nodejs";
import TablerBrandNuxt from "~icons/tabler/brand-nuxt";
import TablerBrandNextJS from "~icons/tabler/brand-nextjs";
import TablerBrandPHP from "~icons/tabler/brand-php";
import TablerBrandReact from "~icons/tabler/brand-react";
import TablerBrandTailwind from "~icons/tabler/brand-tailwind";
import TablerBrandTypescript from "~icons/tabler/brand-typescript";
import TablerBrandVue from "~icons/tabler/brand-vue";
import TablerSQL from "~icons/tabler/sql";
import type { Tool } from "./types";

export const tools: Tool[] = [{
  icon: TablerBrandHTML5,
  label: "HTML",
}, {
  icon: TablerBrandCSS3,
  label: "CSS",
  extras: [{
    icon: TablerBrandTailwind,
    label: "Tailwind CSS"
  }]
}, {
  icon: TablerBrandJavaScript,
  label: "JS",
  extras: [{
    icon: TablerBrandTypescript,
    label: "Typescript"
  }]
}, {
  icon: TablerSQL,
  label: "SQL",
  extras: [{
    icon: TablerBrandMySQL,
    label: "MySQL"
  }]
}, {
  icon: TablerBrandMongoDB,
  label: "MongoDB",
}, {
  icon: TablerBrandReact,
  label: "React",
  extras: [{
    icon: TablerBrandNextJS,
    label: "NextJS"
  }]
}, {
  icon: TablerBrandVue,
  label: "Vue",
  extras: [{
    icon: TablerBrandNuxt,
    label: "Nuxt"
  }]
}, {
  icon: TablerBrandNodeJS,
  label: "Node",
}, {
  icon: TablerBrandPHP,
  label: "PHP",
  extras: [{
    icon: TablerBrandLaravel,
    label: "Laravel"
  }]
}, {
  icon: TablerBrandGit,
  label: "Git",
}]
