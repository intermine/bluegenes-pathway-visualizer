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
	const [selectedOption, setSelected] = useState('Select All');
	const [checkedCount, setCount] = useState(0);

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

	const createMapFromPathway = (checkedValue = true) => {
		let pathwayMap = {};
		pathwayList.forEach(
			p => (pathwayMap = { ...pathwayMap, [p]: checkedValue })
		);
		setSelectedPathway(pathwayMap);
	};

	useEffect(() => {
		createMapFromPathway(true);
	}, [pathwayList]);

	useEffect(() => {
		const count = Object.keys(selectedPathway).reduce(
			(a, b) => (selectedPathway[b] ? a + 1 : a),
			0
		);
		setCount(count);
		if (count == pathwayList.length) setSelected('Select All');
		else if (!count) setSelected('Deselect All');
		else setSelected('');
	}, [selectedPathway]);

	const updateFilters = ev => {
		const { value, checked } = ev.target;
		if (value == 'Select All' || value == 'Deselect All') {
			setSelected(value);
			value == 'Select All'
				? createMapFromPathway(true)
				: createMapFromPathway(false);
			return;
		}
		setSelectedPathway({
			...selectedPathway,
			[value]: checked
		});
	};

	const filterGraph = () => {
		const filteredMap = data.map(item => ({
			...item,
			pathways: item.pathways.filter(g => selectedPathway[g.name] != false)
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
								updateFilters={updateFilters}
								filterGraph={filterGraph}
								selectedOption={selectedOption}
								selectedPathway={selectedPathway}
								checkedCount={checkedCount}
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
