import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import 'components/Appointment/styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"; 
const CONFIRM = "CONFIRM"; 
const ERROR = "ERROR";
const STATUS = "STATUS";

const Appointment = (props) => {
  return(
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? 
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        /> : <Empty />}
    </article>
  );
};

export default Appointment; 