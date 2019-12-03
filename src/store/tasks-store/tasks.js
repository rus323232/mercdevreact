import {
  types, getRoot, destroy,
} from 'mobx-state-tree';

import { randomId } from '../../core/utils';
import { FILTERS } from '../../core/constants';

const getTaskSchema = () => ({
  id: randomId(),
  title: '',
  isDone: false,
  date: new Date().toISOString(),
});

export const initialState = {
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

const filterActionsMap = {
  [FILTERS.SHOW_ALL.id]: () => true,
  [FILTERS.SHOW_DONE.id]: task => task.isDone,
  fallback: () => true,
};

const getFilterAction = id => (
  filterActionsMap[id] || filterActionsMap.fallback
);

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
    /**
     * Немного не понял как доставать инстанс родительского стора в таких случаях ?
     * можно конечно еще таким образом getParent(getParent(self)) но мне тоже какжется я что-то
     * не так делаю
     */
    getRoot(self).tasksStore.removeTask(self);
  },
}));

const TasksListModel = types.model('TasksListModel', {
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

export default TasksListModel;
