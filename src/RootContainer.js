import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GenePathwayNetwork from './components/GenePathwayNetwork';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setData(data);
		});
	}, []);

	return (
		<div className="rootContainer">
			{data.length ? <GenePathwayNetwork data={data} /> : <h1>Loading...</h1>}
		</div>
	);
};

export default RootContainer;
