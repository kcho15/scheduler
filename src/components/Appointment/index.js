import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import 'components/Appointment/styles.scss'

const Appointment = (props) => {
  return(
    <article className="appointment">
      <Header />
      {props.interview ? 
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        /> : <Empty />}
    </article>
  );
};

export default Appointment; 