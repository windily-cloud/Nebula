import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import wikiLinkPlugin from "remark-wiki-link-plus";
import callouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "Pkmer Publish",
            // Set English as the default language for this site.
            defaultLocale: "en",
            locales: {
                // English docs in `src/content/docs/en/`
                en: {
                    label: "English",
                },
                // Simplified Chinese docs in `src/content/docs/zh-cn/`
                "zh-cn": {
                    label: "简体中文",
                    lang: "zh-CN",
                },
            },
            social: {
                github: 'https://github.com/withastro/starlight',
            },
            sidebar: [
                {
                    label: "教程",
                    autogenerate: { directory: "guides" },
                },
            ],
        }),
    ],
    markdown: {
        remarkPlugins: [
            remarkGfm,
            remarkMath,
            callouts,
            [
                wikiLinkPlugin,
                {
                    markdownFolder: "/src/content",
                    hrefTemplate: (permalink) => `/${permalink}`,
                },
            ],
        ],
    },
});
