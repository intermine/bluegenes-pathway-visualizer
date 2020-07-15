import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import {
	getGraphData,
	createCytoscapeConfig,
	createTooltip,
	createTooltipData
} from '../utils';

cytoscape.use(coseBilkent);

function GenePathwayNetwork({ data }) {
	useEffect(() => {
		let cy = cytoscape(createCytoscapeConfig(getGraphData(data || [])));
		let div;
		let node = cy.elements().nodes();
		node.unbind('mouseover');
		node.bind('mouseover', event => {
			document.body.style.cursor = 'pointer';
			div = createTooltip(event.renderedPosition, createTooltipData(event));
		});
		node.unbind('mouseout');
		node.bind('mouseout', () => {
			document.body.style.cursor = 'default';
			div.style.display = 'none';
		});
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
}

export default GenePathwayNetwork;
