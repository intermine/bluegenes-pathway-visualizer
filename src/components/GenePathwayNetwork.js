import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { getGraphData, createCytoscapeConfig } from '../utils';

cytoscape.use(coseBilkent);

function GenePathwayNetwork({ data }) {
	useEffect(() => {
		cytoscape(createCytoscapeConfig(getGraphData(data || [])));
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
}

export default GenePathwayNetwork;
