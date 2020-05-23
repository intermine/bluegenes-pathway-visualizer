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
	const [selectedOption, setSelected] = useState('Select All');

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

	useEffect(() => {
		setSelectedPathway(pathwayList);
	}, [pathwayList]);

	const updateFilters = ev => {
		const { value } = ev.target;
		if (value == 'Select All' || value == 'Deselect All') {
			setSelected(value);
			const arr = value == 'Select All' ? pathwayList : [];
			setSelectedPathway(arr);
			return;
		}
		if (selectedOption) setSelected('');
		const index = selectedPathway.indexOf(value);
		if (index > -1) {
			selectedPathway.splice(index, 1);
			setSelectedPathway([...selectedPathway]);
		} else setSelectedPathway([...selectedPathway, ev.target.value]);
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
								selectedOption={selectedOption}
								selectedPathway={selectedPathway}
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
