import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import { getGraphData, createCytoscapeConfig } from '../utils';

function GenePathwayNetwork({ data }) {
	useEffect(() => {
		cytoscape(createCytoscapeConfig(getGraphData(data || [])));
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
}

export default GenePathwayNetwork;
