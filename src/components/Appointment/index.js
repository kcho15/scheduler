import React, { useEffect } from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import 'components/Appointment/styles.scss'
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"; 
  const CONFIRM = 'CONFIRM';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  useEffect(() => { //To solve transition bug after implementing WebSocket.
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          // onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          onCancel={back}
          // onSave={save}
          interviewers={props.interviewers}
        />
      )}


    </article>
  );
};

export default Appointment; 