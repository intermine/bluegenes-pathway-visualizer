import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GenePathwayNetwork from './components/GenePathwayNetwork';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [pathwayList, setPathwayList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setData(data);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		const pathways = data.reduce(
			(acc, d) => acc.concat(d.pathways.map(p => p.name)),
			[]
		);
		setPathwayList([...new Set(pathways)]);
	}, [data]);

	return (
		<div className="rootContainer">
			{loading && !pathwayList.length ? (
				<h1>Loading...</h1>
			) : (
				<div className="innerContainer">
					<div className="graph">
						<span className="chart-title">Pathway Network</span>
						<GenePathwayNetwork data={data} />
					</div>
				</div>
			)}
		</div>
	);
};

export default RootContainer;
