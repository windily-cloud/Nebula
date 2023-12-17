import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();


//todo: 严格限制yaml类型，否则在部署时容易报错
export async function GET(context: any) {
    const blog = await getCollection('docs');
    return rss({
        title: 'Buzz’s Blog',
        description: 'A humble Astronaut’s guide to the stars',
        site: context.site,
        stylesheet: 'rss/rss.xsl',
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: new Date(post.data.uid),
            description: post.data.description,
            content: sanitizeHtml(parser.render(post.body)),
            link: `/blog/${post.slug}/`,
        })),
    });
}