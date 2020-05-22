import React from 'react';

const FilterPanel = ({ updateFilters, pathwayList, filterGraph }) => {
	return (
		<div className="filter-panel-root">
			<h4 className="filter-panel-title">Available Pathways</h4>
			<hr />
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
			<button type="button" className="filter-button" onClick={filterGraph}>
				Filter
			</button>
		</div>
	);
};

export default FilterPanel;