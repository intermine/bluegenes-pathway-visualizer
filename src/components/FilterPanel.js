import React from 'react';

const FilterPanel = ({ pathwayList }) => {
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
									<input type="checkbox" id={term} value={term} />
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
		</div>
	);
};

export default FilterPanel;
