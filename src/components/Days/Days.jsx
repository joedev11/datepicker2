import React, { useState } from 'react';
import './days.css';

const Days = ({ date, onChangeDate }) => {
  console.log('days: ' + date)
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateClick = (day) => {
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const newDate = new Date(currentYear, currentMonth, day);
  
    console.log('Days' + newDate);
    onChangeDate(newDate);
    setSelectedDate(newDate);
  };  

  const formatDate = (date) => {
    // console.log('formatDate: ' + date)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const populateDaysInSelectedMonth = () => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const daysBefore = firstDayOfMonth;
    const totalDisplayedDays = daysBefore + daysInCurrentMonth;
    const daysAfter = 42 - totalDisplayedDays;

    const daysArr = [];

    // Populate the days from the previous month
    for (let i = daysBefore - 1; i >= 0; i--) {
      daysArr.push(
        <div key={`prev-${i}`} className="days inactive">
          {prevMonthDays - i}
        </div>
      );
    }

    // Populate the days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const day = i.toString();
      const today = new Date();
      const newDate = new Date(currentYear, currentMonth, i); // Create a new Date for comparison
      const isSelected = formatDate(selectedDate) === formatDate(newDate); // Use the same formatting function
      const isToday = today.getDate() === i && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

      daysArr.push(
        <span
          key={day}
          onClick={() => handleDateClick(i)}
          className={`days ${isSelected ? 'red' : ''} ${isToday ? 'today' : ''}`}
        >
          {day}
        </span>
      );
    }
    

    // Populate the days from the next month
    for (let i = 0; i < daysAfter; i++) {
      daysArr.push(
        <div key={`next-${i}`} className="days inactive">
          {i + 1}
        </div>
      );
    }

    return daysArr;
  };

  return <div className="days-container">{populateDaysInSelectedMonth()}</div>;
};

export default Days;
