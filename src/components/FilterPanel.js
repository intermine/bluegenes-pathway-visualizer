import React from 'react';

const FilterPanel = ({
	updateFilters,
	filterGraph,
	selectedPathway,
	checkedCount,
	selectAll,
	deselectAll,
	updateToggle,
	toggleStatus
}) => {
	const moreOptions = [
		{
			option: 'Select All',
			requiredCount: Object.keys(selectedPathway).length,
			fn: selectAll
		},
		{
			option: 'Deselect All',
			requiredCount: 0,
			fn: deselectAll
		}
	];
	return (
		<div className="filter-panel-root">
			<h4 className="filter-panel-title">Filter Panel</h4>
			<hr />
			<div className="node-filter">
				<div>Shared Nodes:</div>
				<div>
					<label className="switch">
						<input
							type="checkbox"
							value={toggleStatus}
							onChange={updateToggle}
							checked={toggleStatus}
						/>
						<span className="slider round"></span>
					</label>
				</div>
			</div>
			<div className="pathway-filter">Available Pathways:</div>
			<div className="extra-options-container">
				{moreOptions.map(term => (
					<button
						className={
							checkedCount === term.requiredCount
								? 'extra-options selected'
								: 'extra-options not-selected'
						}
						key={term.option}
						onClick={term.fn}
					>
						{term.option}
					</button>
				))}
			</div>
			<div className="filter-panel">
				<div className="filter-container">
					{Object.keys(selectedPathway).map(term => (
						<>
							<div className="option">
								<div>
									<input
										type="checkbox"
										id={term}
										value={term}
										onChange={updateFilters}
										checked={selectedPathway[term]}
									/>
								</div>
								<div>
									<label htmlFor={term}>{term}</label>
								</div>
							</div>
							<div className="nextLine"></div>
						</>
					))}
				</div>
			</div>
			<hr />
			<div className="button-container">
				<button type="button" className="filter-button" onClick={filterGraph}>
					Filter ({checkedCount})
				</button>
			</div>
		</div>
	);
};

export default FilterPanel;
