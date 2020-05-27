import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GenePathwayNetwork from './components/GenePathwayNetwork';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [pathwayList, setPathwayList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedPathway, setSelectedPathway] = useState({});
	const [filteredList, setFilteredList] = useState([]);
	const [checkedCount, setCount] = useState(0);

	useEffect(() => {
		setLoading(true);
		let { value } = entity;
		queryData({
			serviceUrl: serviceUrl,
			geneId: !Array.isArray(value) ? [value] : value
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

	const initMapFromPathway = (checkedValue = true) => {
		let pathwayMap = {};
		pathwayList.forEach(
			p => (pathwayMap = { ...pathwayMap, [p]: checkedValue })
		);
		setSelectedPathway(pathwayMap);
	};

	useEffect(() => {
		setCount(pathwayList.length);
		initMapFromPathway(true);
	}, [pathwayList]);

	const updateFilters = ev => {
		const { value, checked } = ev.target;

		setSelectedPathway({
			...selectedPathway,
			[value]: checked
		});
		setCount(count => (checked ? count + 1 : count - 1));
	};

	const filterGraph = () => {
		const filteredMap = data.map(item => ({
			...item,
			pathways: item.pathways.filter(g => selectedPathway[g.name] != false)
		}));
		setFilteredList(filteredMap);
	};

	const selectAll = () => {
		initMapFromPathway(true);
		setCount(pathwayList.length);
	};

	const deselectAll = () => {
		initMapFromPathway(false);
		setCount(0);
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
								updateFilters={updateFilters}
								filterGraph={filterGraph}
								selectedPathway={selectedPathway}
								checkedCount={checkedCount}
								selectAll={selectAll}
								deselectAll={deselectAll}
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
