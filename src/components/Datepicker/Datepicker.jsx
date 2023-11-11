import React, { useEffect, useState } from 'react'
import './Datepicker.css'
import Navigation from '../Navigation/Navigation'
import Days from '../Days/Days'
import Months from '../Months/Months'

const Datepicker = ({date, onDateChange}) => {
  console.log('datepicker: ' + date);
  const [view, setView] = useState('days')
  const [currentDate, setCurrentDate] = useState(date)

  const handleDateChange = (newDate) => {
    console.log('dateChange' + newDate)
    const updatedDate = new Date(newDate);
    // const updatedDate = {'date': newDate};
    setCurrentDate(updatedDate);
    onDateChange(updatedDate);

  };

  useEffect(() => {
    console.log('Updated view:', view);
  }, [view]);

  const renderContent = () => {
    switch(view) {
      case 'days':
        return <Days date={currentDate} onChangeDate={handleDateChange}/>
      case 'months':
        return <Months date={currentDate}/>
      default:
        return <Days date={currentDate} onChangeDate={handleDateChange}/>
    }
  }

  return (
    <div>
        <div className="datepicker-container">
          <Navigation date={currentDate} onClick={() => setView('months')} onChangeMonth={handleDateChange}/>
          {renderContent()}
        </div>
      
    </div>
  )
}

export default Datepicker;