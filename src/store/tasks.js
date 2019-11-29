import { types, getRoot, destroy } from 'mobx-state-tree';

import StoreTypes from './store-types';
import { randomId } from '../core/utils';
import { FILTERS } from '../core/constants';

const getTaskSchema = () => ({
  id: randomId(),
  title: '',
  isDone: false,
  date: new Date().toISOString(),
});

const filterActionsMap = {
  [FILTERS.SHOW_ALL.id]: () => true,
  [FILTERS.SHOW_DONE.id]: task => task.isDone,
  fallback: () => true,
};

const getFilterAction = id => (
  filterActionsMap[id] || filterActionsMap.fallback
);

const initialState = {
  tasks: [
    {
      ...getTaskSchema(),
      isDone: true,
      title: 'Initial done task',
    },
    {
      ...getTaskSchema(),
      title: 'Initial undone task',
    },
  ],
};

const TaskModel = types.model('TaskModel', {
  id: types.string,
  date: types.string,
  title: types.string,
  isDone: types.optional(types.boolean, false),
}).actions(self => ({
  toggle() {
    self.isDone = !self.isDone;
  },
  remove() {
    getRoot(self).removeTask(self);
  },
}));

const TasksStore = types.model(StoreTypes.TasksStore, {
  tasks: types.optional(types.array(TaskModel), []),
  checkedFilterId: types.optional(types.string, ''),
})
  .actions(self => ({
    addTask(title) {
      self.tasks.push({
        ...getTaskSchema(),
        title,
      });
    },
    removeTask(task) {
      destroy(task);
    },
    selectFilter({ id = '' }) {
      self.checkedFilterId = id;
    },
  }))
  .views(self => ({
    get getFilteredTasks() {
      const filter = getFilterAction(self.checkedFilterId);

      return self.tasks.filter(filter);
    },
  }));

export default TasksStore.create(initialState);
