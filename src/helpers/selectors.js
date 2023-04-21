export function getAppointmentsForDay (state, day){
  // find day name out of array -> day object 
  const targetDay = state.days.find((dayName) => dayName.name === day)  

  // If the day object is not found, return an empty array
  if(!targetDay) {
    return []; 
  }

  // Map over the appointments array for the target day and return an array of appointment objects
  const appointments = targetDay.appointments.map((id) => state.appointments[id]); 

  return appointments; 
};

