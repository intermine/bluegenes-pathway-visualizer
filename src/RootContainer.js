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
	const [toggleStatus, setToggleStatus] = useState(true);
	const [sharedPathwayList, setSharedPathwayList] = useState([]);

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

	useEffect(() => {
		const counts = new Map();
		filteredList.forEach(geneData => {
			geneData &&
				geneData.pathways &&
				geneData.pathways.filter(item => {
					let count = counts.get(item.identifier);
					if (typeof count !== 'undefined') {
						var freq = count[0];
						var gene = count[1];
					}
					counts.set(
						item.identifier,
						count ? [freq + 1, [...gene, geneData]] : [1, [geneData]]
					);
					return count === 1;
				});
		});
		const map = {};
		for (const [key, value] of counts.entries()) {
			const freq = value[0],
				geneArr = value[1];
			if (freq > 1) {
				const filteredMap = geneArr.map(item => ({
					...item,
					pathways: item.pathways.filter(g => g.identifier === key)
				}));
				filteredMap.forEach(item => {
					if (!map[item.symbol]) map[item.symbol] = item;
					else map[item.symbol].pathways.push(...item.pathways);
				});
			}
		}
		setSharedPathwayList([...Object.values(map)]);
	}, [filteredList]);

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
							<GenePathwayNetwork
								data={toggleStatus ? sharedPathwayList : filteredList}
							/>
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
								updateToggle={() => setToggleStatus(!toggleStatus)}
								toggleStatus={toggleStatus}
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
