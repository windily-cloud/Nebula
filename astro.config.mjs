import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeMathJaxSvg from "rehype-mathjax";
import callouts from "@portaljs/remark-callouts";
import wikiLinkPlugin from "./src/plugins/wikilink/remarkWikiLink.ts";
import { getPermalinks } from "./src/plugins/wikilink/getPermalinks.ts";
import remarkTextHighlight from "./src/plugins/remark-text-highlight";
const permalinks = await getPermalinks("./src/content/docs");

// https://astro.build/config
export default defineConfig({
  site: "https://windily-cloud.github.io",
  base: "/Nebula",
  integrations: [starlight({
    title: "Nebula",
    // Set English as the default language for this site.
    // defaultLocale: "en",
    locales: {
      // English docs in `src/content/docs/en/`
      // en: {
      //     label: "English",
      // },
      // Simplified Chinese docs in `src/content/docs/zh-cn/`
      root: {
        label: "简体中文",
        lang: "zh-CN"
      }
    },
    social: {
      github: "https://github.com/withastro/starlight",
      rss: "http://localhost:4321/rss.xml"
    },
    sidebar: [{
      label: "规划",
      autogenerate: {
        directory: "规划"
      }
    }],
    customCss: ["./src/styles/base.css"]
  })],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMath, callouts, remarkTextHighlight(), [wikiLinkPlugin, {
      pathFormat: "obsidian-short",
      permalinks,
      hrefTemplate: permalink => {
        const link = permalink.replace("src/content/docs", "").replace(" ", "-").toLowerCase();
        return `/Nebula${link}`;
      }
    }]],
    rehypePlugins: [rehypeMathJaxSvg]
  }
});