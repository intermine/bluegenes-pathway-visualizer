import React from 'react';

const FilterPanel = ({
	updateFilters,
	filterGraph,
	selectedOption,
	selectedPathway,
	checkedCount
}) => {
	const moreOptions = ['Select All', 'Deselect All'];
	return (
		<div className="filter-panel-root">
			<h4 className="filter-panel-title">Available Pathways</h4>
			<hr />
			<div className="extra-options-container">
				{moreOptions.map(term => (
					<div
						className={
							term == selectedOption
								? 'extra-options selected'
								: 'extra-options not-selected'
						}
						key={term}
					>
						<input
							type="radio"
							id={term}
							value={term}
							onChange={updateFilters}
						/>
						<label htmlFor={term}>{term}</label>
					</div>
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
