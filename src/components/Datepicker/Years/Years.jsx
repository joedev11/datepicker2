import React, { useState, useEffect } from 'react';
import './years.css';

const Years = ({ date, onChangeYear }) => {
    console.log('YearsDate: ' + date)
  const currentYear = date.getFullYear();
  const startYear = (Math.floor(currentYear / 10) * 10) - 1;
  const endYear = startYear + 11;

  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    setSelectedYear(currentYear);
  }, [currentYear]);

  const handleYearClick = (year) => {
    onChangeYear(year);
    setSelectedYear(year);
  };

  const renderYears = () => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const isInactive = year === startYear || year === endYear;
      years.push(
        <div
          key={year}
          onClick={() => handleYearClick(year)}
          className={`year ${selectedYear === year ? 'red' : ''} ${isInactive ? 'inactive' : ''}`}
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
