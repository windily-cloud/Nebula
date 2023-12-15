import { visit } from 'unist-util-visit';
import type { Plugin, Transformer } from 'unified';

export default function remarkTextHighlight(): Plugin<[], any> {
	const transformer: Transformer<any> = (tree, file) => {
		visit(tree, 'text', (text) => {
			const regex = /.*==.*==/;
			if (regex.test(text.value)) {
				text.type = 'html';
				text.value = `${text.value
					.replace('==', '<span class="text-highlight">')
					.replace('==', '</span>')}`;
			}
		});
	};

	return function attacher() {
		return transformer;
	};
}
