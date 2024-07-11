import './index.css'

const FilterDetails = props => {
  const renderEmplomentTypesList = () => {
    const {
      updateEmploymentTypesChecked,
      employmentTypeChecked,
      employmentTypesList,
    } = props

    return (
      <ul className="filters-list">
        {employmentTypesList.map(eachType => (
          <li className="filters-list-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              className="checkbox-input"
              id={eachType.employmentTypeId}
              checked={employmentTypeChecked.includes(
                eachType.employmentTypeId,
              )}
              onChange={() =>
                updateEmploymentTypesChecked(eachType.employmentTypeId)
              }
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryRangesList = () => {
    const {updateSalaryRange, activeSalaryRange, salaryRangesList} = props

    return (
      <ul className="filters-list">
        {salaryRangesList.map(eachRange => (
          <li className="filters-list-item" key={eachRange.salaryRangeId}>
            <input
              type="radio"
              className="checkbox-input"
              id={eachRange.salaryRangeId}
              name="salary ranges"
              onChange={() => updateSalaryRange(eachRange.salaryRangeId)}
              checked={eachRange.salaryRangeId === activeSalaryRange}
            />
            <label htmlFor={eachRange.salaryRangeId} className="filter-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="filters-container">
      <h1 className="filter-heading">Type of Employment</h1>
      {renderEmplomentTypesList()}
      <hr className="separator" />
      <h1 className="filter-heading">Salary Range</h1>
      {renderSalaryRangesList()}
    </div>
  )
}

export default FilterDetails
