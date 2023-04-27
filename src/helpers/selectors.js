/* 
Selector: function that takes state as argument and returns data from that state
*/ 

export function getAppointmentsForDay (state, day){
  // find day name out of array -> day object, [0] is the object inside the array
  const targetDay = state.days.filter((dayName) => dayName.name === day)[0];   

  // If the day object is not found, return an empty array
  if(!targetDay) {
    return []; 
  };

  // Map over the appointments array for the target day and return an array of appointment objects
  const appointmentData = targetDay.appointments.map((id) => state.appointments[id]); 

  return appointmentData; 
};

export function getInterview (state, interview) {
  let interviewObj = {};
  
  if(!interview) {
    return null;
  };

  const id = interview.interviewer;  
  const interviewer = state.interviewers[id]  

  interviewObj.student = interview.student;
  interviewObj.interviewer = interviewer;  

  return interviewObj;
};

export function getInterviewersForDay(state, day) {
  const interviewersForDay = state.days.filter(singleDay => singleDay.name === day)[0];

  if (!interviewersForDay) {
    return [];
  };

  const interviewersData = interviewersForDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);

  return interviewersData;
};
