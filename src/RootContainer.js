import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GenePathwayNetwork from './components/GenePathwayNetwork';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [pathwayList, setPathwayList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPathway, setSelectedPathway] = useState([]);
	const [filteredList, setFilteredList] = useState([]);

	useEffect(() => {
		setLoading(true);
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setData(data);
			setFilteredList(data);
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

	const updateFilters = ev => {
		setSelectedPathway([...selectedPathway, ev.target.value]);
	};

	const filterGraph = () => {
		const filteredMap = data.map(item => ({
			...item,
			pathways: item.pathways.filter(g => selectedPathway.includes(g.name))
		}));
		setFilteredList(filteredMap);
	};

	return (
		<div className="rootContainer">
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div className="innerContainer">
					<div className="graph">
						<span className="chart-title">Pathway Network</span>
						{filteredList.length ? (
							<GenePathwayNetwork data={filteredList} />
						) : (
							<h2>Data Not Found!</h2>
						)}
					</div>
					{pathwayList.length ? (
						<div className="controls">
							<FilterPanel
								pathwayList={pathwayList}
								updateFilters={updateFilters}
								filterGraph={filterGraph}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

export default RootContainer;
