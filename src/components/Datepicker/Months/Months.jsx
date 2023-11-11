import React from 'react';
import './months.css';

const Months = ({ date, onChangeMonth, onChangeView }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentMonth = date.getMonth();

  const handleMonthClick = (index) => {
    const newDate = new Date(date.getFullYear(), index, 1);
    console.log("months Date" + newDate)
    onChangeMonth(newDate);
    onChangeView('days');
  };

  return (
    <ul className="months-container">
      {months.map((month, index) => (
        <li key={index} onClick={() => handleMonthClick(index)}
        className= {`month ${index === currentMonth ? 'red' : ''}`}>
          {month}
        </li>
      ))}
    </ul>
  );
};

export default Months;
