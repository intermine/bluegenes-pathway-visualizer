import React from 'react';
import ReactDOM from 'react-dom';
import imjs from 'imjs';
import GenePathwayNetwork from '../src/components/GenePathwayNetwork';
import { queryData } from '../src/query';

describe('charts', () => {
	let data = [];
	beforeAll(() => {
		return queryData({
			geneId: '1215734',
			serviceUrl: 'https://www.humanmine.org/humanmine',
			imjsClient: imjs
		})
			.then(res => (data = res))
			.catch(() => {});
	});

	test('GenePathwayNetwork renders canvas', () => {
		const el = document.createElement('div');
		ReactDOM.render(<GenePathwayNetwork data={data} />, el);
		expect(el.innerHTML).toContain('div');
	});
});
