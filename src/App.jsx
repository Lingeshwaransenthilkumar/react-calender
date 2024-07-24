import { useState } from "react";

// we are going to assign values for months and days of week in a array
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function App(){
  
  //gives a value of current date
  const [selectedDate,getSelectedDate] = useState(new Date());

  // To calculate month values like first day and last day

  function daysInMonth(){
    const daysArray=[]
    // first day
    const firstDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    // last day
    const lastDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);

    for(let i=0;i<firstDay.getDay();i++){
      daysArray.push(null);
    }
    
    // used to push all elements before last day
    for(let i=1;i<=lastDay.getDate();i++){
      daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
      // i is used to find which day , same first day, last day logic applicable here
    }

    return daysArray;
  }

  function handleChangeMonth(e){
    // integer conversion
    const newMonth = parseInt(e.target.value,10);
    getSelectedDate(new Date(selectedDate.getFullYear(),newMonth,1));
  }

  function handleChangeYear(e){
    const newYear = parseInt(e.target.value,10);
    getSelectedDate(new Date(newYear,selectedDate.getMonth(),1));
  }

  function handlePreviousMonth(){
    // year,month,day of the week(3 parameters)
    getSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1));
  }

  function handleNextMonth(){
    getSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1));
  }

  // checking current date
  const isSameDay = (date1,date2)=>{
    console.log(date1.getDate()===date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear()===date2.getFullYear());
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }



  return(
    <>
      <div className="calender">
        <div className="header">
          {/* using set selected date , getting date like normal and setting in it */}
          <button onClick={handlePreviousMonth}>
          <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <select name="" id="" value={selectedDate.getMonth()} onChange={handleChangeMonth}>
            {months.map((month,index)=>(
              <option key={index} value={index}>{month}</option>
              ))}
          </select>
          <select name="" id="" value={selectedDate.getFullYear()} onChange={handleChangeYear}>
              {/* this function used to write code for array with selected year -5 years and +5 years */}
              {Array.from({length:10},(_,i)=>selectedDate.getFullYear() - 5 + i)
              .map((year)=>(
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              }
          </select>
          <button onClick={handleNextMonth}>
          <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
        {/* templating days of a week */}
        <div className="daysOfWeek">
          {daysOfWeek.map((day)=>(
            <div key={day} className={day}>{day}</div>
          ))}
        </div>
        {/* templating every day */}
        <div className="days">
          {/* null values till first day will not print so assign it with empty "" string */}
          {daysInMonth().map((day,index)=>(
            <div key={index} className={day ? (isSameDay(day,new Date()) ? "day current" : "day") : "empty"}>
              {day ? day.getDate():""}
              </div>
          ))}
        </div>
      </div>
    </>
  )

}

export default App;