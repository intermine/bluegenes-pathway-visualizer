function getGraphData(data) {
	const elements = [];
	data.forEach(el => {
		const { symbol, name, primaryIdentifier, organism } = el;
		elements.push({
			group: 'nodes',
			data: {
				id: el.symbol,
				info: {
					class: el.class,
					symbol,
					name,
					shortName: organism.shortName,
					primaryIdentifier
				}
			}
		});
		el.pathways &&
			el.pathways.forEach(pathway => {
				const { name, identifier } = pathway;
				elements.push({
					group: 'nodes',
					data: {
						id: identifier,
						info: {
							class: pathway.class,
							name
						}
					}
				});
				elements.push({
					group: 'edges',
					data: {
						target: el.symbol,
						source: identifier
					}
				});
			});
	});
	return elements;
}

function createCytoscapeConfig(elements) {
	return {
		container: document.getElementById('cy'),
		elements: elements,
		grabbable: true,
		style: [
			{
				selector: 'node',
				style: {
					label: 'data(id)',
					'background-color': 'data(bg)'
				}
			},
			{
				selector: 'edge',
				style: {
					'line-color': '#ccc'
				}
			}
		],
		layout: {
			name: 'cose-bilkent',
			quality: 'draft',
			fit: true,
			padding: 20,
			idealEdgeLength: 150
		}
	};
}

export { getGraphData, createCytoscapeConfig };
