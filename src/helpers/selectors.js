export function getAppointmentsForDay (state, day){
  // find day name out of array -> day object 
  const targetDay = state.days.find((dayName) => dayName.name === day)  

  if(!targetDay) {
    return []; 
  }

  const appointments = targetDay.appointments.map((id) => state.appointments[id]); 

  return appointments; 
};

