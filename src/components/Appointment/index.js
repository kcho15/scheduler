import React from 'react';
import 'components/Appointment/styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import Confirm from './Confirm';
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"; 
  const SAVING = "SAVING"; 
  const CONFIRM = 'CONFIRM';
  
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // SAVE
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log('interview', interview);

    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(()=> {
        transition(SHOW);
      })
  }


  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}

        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}

    </article>
  );
};

export default Appointment; 