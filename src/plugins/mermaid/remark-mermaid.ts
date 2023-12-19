import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import mermaid from 'mermaid';


export default function remarkMermaid(): Plugin<[], any> {
    const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    const escapeHtml = (str: string) => str.replace(/[&<>"']/g, (c) => escapeMap[c]);
    const transformer = (tree: any, file: any) => {
        visit(tree, 'code', (node) => {
            if (node.lang !== 'mermaid') return;

            node.type = 'html';
            node.value = `
      <pre class="mermaid">
        ${escapeHtml(node.value)}
      </pre>
    `;
        });
    }

    return function attacher() {
        return transformer;
    }
}
