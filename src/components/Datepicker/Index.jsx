import React, { useEffect, useState } from 'react'
import './index.css'
import Navigation from './Navigation/Navigation'
import Days from './Days/Days'
import Months from './Months/Months'
import Years from './Years/Years'

const Datepicker = ({date = new Date()}) => {
  const [view, setView] = useState('days')
  const [currentDate, setCurrentDate] = useState(date)
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (newDate) => {
    console.log('dateChange' + newDate)
    const updatedDate = new Date(newDate);
    // const updatedDate = {'date': newDate};
    setCurrentDate(updatedDate);
  };

  const handleViewChange = (view) => {
    setView(view);
    console.log(view)
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    console.log('Updated Index view:', view);
    console.log('Updated Index date:', currentDate)
  }, [view, currentDate]);

  const renderContent = () => {
    switch(view) {
      case 'days':
        return <Days date={currentDate} onChangeDate={handleDateChange} onCloseCalendar={handleCloseCalendar}/>
      case 'months':
        return <Months date={currentDate} onChangeMonth={handleDateChange} onChangeView={handleViewChange}/>
      case 'years':
        return <Years date={currentDate} />
      default:
        return <Days date={currentDate} onChangeDate={handleDateChange} onCloseCalendar={handleCloseCalendar}/>
    }
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0'); // Use getDate() instead of getDay()
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
            <div className="input-container">
        <input
          type="text"
          value={formatDate(currentDate)}
          onClick={toggleCalendar}
          readOnly
          className="input-date"
        />
        <div className="calendar-icon" onClick={toggleCalendar}>
          &#128197;
        </div>
      </div>
      {showCalendar && (
        <div className="datepicker-container">
          <Navigation date={currentDate} view={view} onChangeView={handleViewChange} onChangeMonth={handleDateChange}/>
          {renderContent()}
        </div>
      )}
    </div>
  )
}

export default Datepicker;