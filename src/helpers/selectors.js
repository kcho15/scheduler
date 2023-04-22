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

export function getInterview (state, interview) {
  if(!interview) {
    return null
  };

  const id = interview.interviewer;  
  const interviewer = state.interviewers[id]  

  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar
    }
  }
}