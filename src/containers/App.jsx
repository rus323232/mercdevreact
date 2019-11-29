import React from 'react';
import { observer, inject } from 'mobx-react';

import { StoreTypes } from '../store';
import Filter from '../components/Filter';
import { FILTERS } from '../core/constants';
import TodoList from '../components/TodoList';
import ContentHolder from '../components/ContentHolder';
import TaskInputForm from '../components/TaskInputForm';

const filterItems = Object.values(FILTERS);

function App(props) {
  const {
    addTask,
    selectFilter,
    checkedFilterId,
    getFilteredTasks,
  } = props[StoreTypes.TasksStore];

  const handleFormSubmit = (value) => {
    addTask(value);
  };

  return (
    <ContentHolder centered fullHeight>
      <TaskInputForm onSubmit={handleFormSubmit} />
      <Filter items={filterItems} checkedItemId={checkedFilterId} onChange={selectFilter} />
      <TodoList tasks={getFilteredTasks} />
    </ContentHolder>
  );
}

export default inject(StoreTypes.TasksStore)(observer(App));
