import React from 'react';
import './years.css';

const Years = ({ date, onChangeYear, onChangeView }) => {
    console.log('YearsDate: ' + date)
  const currentYear = date.getFullYear();
  const startYear = (Math.floor(currentYear / 10) * 10) - 1;
  const endYear = startYear + 11;

  const handleYearClick = (year) => {
    const newDate = new Date(year, date.getMonth(), 1);
    onChangeYear(newDate);
    onChangeView('days');
  };

  const renderYears = () => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const isInactive = year === startYear || year === endYear;
      years.push(
        <div
          key={year}
          onClick={() => handleYearClick(year)}
          className={`year ${currentYear === year ? 'red' : ''} ${isInactive ? 'inactive' : ''}`}
        >
          {year}
        </div>
      );
    }
    return years;
  };

  return <div className="years-container">{renderYears()}</div>;
};

export default Years;
