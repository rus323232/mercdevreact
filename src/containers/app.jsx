import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';

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
    checkedFilterId,
    getFilteredTasks,
    addTask,
    loadTasks,
    selectFilter,
    selectedTask,
  } = tasksStore;

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleFormSubmit = (value) => {
    addTask(value);
  };

  const pinnedTaskTitle = selectedTask ? selectedTask.title : 'Нет закрепленных задач';

  return (
    <ContentHolder centered fullHeight>
      <TaskInputForm onSubmit={handleFormSubmit} />
      <Filter items={filterItems} checkedItemId={checkedFilterId} onChange={selectFilter} />
      <h2>Закрепленная задача</h2>
      <div>
        {pinnedTaskTitle}
      </div>
      <TodoList tasks={getFilteredTasks} />
    </ContentHolder>
  );
}

export default observer(App);
