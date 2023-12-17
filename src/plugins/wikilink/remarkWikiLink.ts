// copy from https://github.com/datopian/portaljs

// import { toMarkdown } from "mdast-util-wiki-link";
import { toMarkdown } from "./mdast-util-wiki-link/to-markdown";
import { syntax } from "./syntax";
import type { SyntaxOptions } from "./syntax";
import { fromMarkdown } from "./fromMarkdown";
import type { FromMarkdownOptions } from "./fromMarkdown";

let warningIssued = false;

type RemarkWikiLinkOptions = FromMarkdownOptions & SyntaxOptions;

function remarkWikiLink(this: any, opts: RemarkWikiLinkOptions = {}) {
    const data = this.data(); // this is a reference to the processor

    function add(field: string, value: {
        text?: { 91: { tokenize: (effects: any, ok: any, nok: any) => (code: number) => any; }; 33: { tokenize: (effects: any, ok: any, nok: any) => (code: number) => any; }; }; enter?: { wikiLink: (token: any) => void; }; exit?: { wikiLinkTarget: (token: any) => void; wikiLinkAlias: (token: any) => void; wikiLink: (token: any) => void; }; unsafe?: {
            character: string // this is a reference to the processor
            ; inConstruct: string[];
        }[]; handlers?: { wikiLink: (node: any, _: any, context: any) => string; };
    }) {
        if (data[field]) data[field].push(value);
        else data[field] = [value];
    }

    if (
        !warningIssued &&
        ((this.Parser &&
            this.Parser.prototype &&
            this.Parser.prototype.blockTokenizers) ||
            (this.Compiler &&
                this.Compiler.prototype &&
                this.Compiler.prototype.visitors))
    ) {
        warningIssued = true;
        console.warn(
            "[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin"
        );
    }
    // add extensions to packages used by remark-parse
    // micromark extensions
    //@ts-ignore
    add("micromarkExtensions", syntax(opts));
    // mdast-util-from-markdown extensions
    add("fromMarkdownExtensions", fromMarkdown(opts));
    // mdast-util-to-markdown extensions
    add("toMarkdownExtensions", toMarkdown(opts));
}

export default remarkWikiLink;
export { remarkWikiLink };