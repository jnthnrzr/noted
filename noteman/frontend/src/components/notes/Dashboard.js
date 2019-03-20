import React, { Fragment } from 'react';
import Form from './Form';
import EditableNote from './EditableNote';

function Dashboard() {
  return (
    <Fragment>
      <Form />
      <EditableNote />
    </Fragment>
  );
}

export default Dashboard;
