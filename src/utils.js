const geneColor = '#808080';
const hoveredGeneColor = '#666666';
const pathwayColor = '#F4D03F';
const hoveredPathwayColor = '#EDBE05';

function getGraphData(data) {
	const elements = [];
	data.forEach(el => {
		const { symbol, name, primaryIdentifier, organism } = el;
		elements.push({
			group: 'nodes',
			data: {
				id: el.symbol,
				bg: geneColor,
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
						bg: pathwayColor,
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

function createTooltip(position, content) {
	const div = document.createElement('div');
	const rootElem = document.getElementsByClassName('rootContainer')[0];
	if (rootElem.offsetWidth - position.x > 300) position.x += 50;
	else position.x -= 350;
	div.style.background = 'gray';
	div.style.position = 'absolute';
	div.style.color = 'white';
	div.innerHTML = content;
	div.style.top = position.y + 'px';
	div.style.fontFamily = 'arial';
	div.style.left = position.x + 'px';
	div.style.padding = '10px';
	div.style.width = '250px';
	div.style.border = '1px solid black';
	div.style.borderRadius = '8px';
	document.body.append(div);
	return div;
}

function createTooltipData(node) {
	const {
		data: { info }
	} = node.target[0]._private;

	if (info.class === 'Gene') {
		node.target.style('backgroundColor', hoveredGeneColor);
		return `
			<div>
				<span>Symbol: </span><strong>${info.symbol}</strong><br/><div style="padding: 2px"></div>
				<span>Name: </span><strong>${info.name}</strong><br/><div style="padding: 2px"></div>
				<span>Primary Identifier: </span><strong>${info.primaryIdentifier}</strong>
			</div>
		`;
	}
	if (info.class === 'Pathway') {
		node.target.style('backgroundColor', hoveredPathwayColor);
		return `
			<div>
				<span>Symbol: </span><strong>${node.target[0]._private.data.id}</strong><br/><div style="padding: 4px"></div>
				<span>Name: </span><strong>${info.name}</strong><br/><div style="padding: 4px"></div>
			</div>
		`;
	}
}

function changeNodeColor(node) {
	const {
		data: { info }
	} = node.target[0]._private;
	if (info.class === 'Gene') node.target.style('backgroundColor', geneColor);
	if (info.class === 'Pathway')
		node.target.style('backgroundColor', pathwayColor);
}

export {
	getGraphData,
	createCytoscapeConfig,
	createTooltip,
	createTooltipData,
	changeNodeColor
};
