import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../store';
import Filter from '../components/filter';
import { FILTERS } from '../core/constants';
import TodoList from '../components/todo-list';
import ContentHolder from '../components/content-holder';
import TaskInputForm from '../components/task-input-form';

const filterItems = Object.values(FILTERS);

function App() {
  const { tasksStore } = useContext(StoreContext);
  const {
    addTask,
    selectFilter,
    checkedFilterId,
    getFilteredTasks,
  } = tasksStore;

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

export default observer(App);
