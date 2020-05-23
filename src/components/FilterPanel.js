import React from 'react';

const FilterPanel = ({
	updateFilters,
	pathwayList,
	filterGraph,
	selectedOption,
	selectedPathway
}) => {
	const moreOptions = ['Select All', 'Deselect All'];
	return (
		<div className="filter-panel-root">
			<h4 className="filter-panel-title">Available Pathways</h4>
			<hr />
			<div className="extra-options-container">
				{pathwayList.length &&
					moreOptions.map(term => (
						<div className="extra-options" key={term}>
							<input
								type="radio"
								id={term}
								value={term}
								onChange={updateFilters}
								checked={term == selectedOption}
							/>
							<label htmlFor={term}>{term}</label>
						</div>
					))}
			</div>
			<div className="filter-panel">
				<div className="filter-container">
					{pathwayList.map(term => (
						<>
							<div className="option">
								<div>
									<input
										type="checkbox"
										id={term}
										value={term}
										onChange={updateFilters}
										checked={selectedPathway.includes(term)}
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
					Filter
				</button>
			</div>
		</div>
	);
};

export default FilterPanel;
