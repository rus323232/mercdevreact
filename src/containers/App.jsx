import React from 'react';
import { observer, inject } from 'mobx-react';

import { StoreTypes } from '../store';
import TaskInputForm from '../components/TaskInputForm';
import ContentHolder from '../components/ContentHolder';

function App(props) {
  const store = props[StoreTypes.TasksStore];

  return (
    <ContentHolder>
      <TaskInputForm></TaskInputForm>
    </ContentHolder>
  );
}

export default inject(StoreTypes.TasksStore)(observer(App));
