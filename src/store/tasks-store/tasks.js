import {
  flow,
  types,
  destroy,
  getParent,
  applySnapshot,
} from 'mobx-state-tree';

import { tasksApi } from '../../services';
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

const mapTasksTitles = dataWithTitles => dataWithTitles.map(({ shortText = '' }) => ({
  ...getTaskSchema(),
  title: shortText,
}));

const filterActionsMap = {
  [FILTERS.SHOW_ALL.id]: () => true,
  [FILTERS.SHOW_DONE.id]: task => task.isDone,
  fallback: () => true,
};

const getFilterAction = id => (
  filterActionsMap[id] || filterActionsMap.fallback
);

const TaskModel = types.model('TaskModel', {
  id: types.identifier,
  date: types.string,
  title: types.string,
  isDone: types.optional(types.boolean, false),
}).actions(self => ({
  toggle() {
    self.isDone = !self.isDone;
  },
  pin() {
    getParent(self, 2).pinTask(self);
  },
  unpin() {
    getParent(self, 2).unpinTask();
  },
  remove() {
    getParent(self, 2).removeTask(self);
  },
})).views(self => ({
  get isTaskPinned() {
    const { selectedTask } = getParent(self, 2);

    if (!selectedTask) {
      return false;
    }

    return self.id === selectedTask.id;
  },
}));

const TasksListModel = types.model('TasksListModel', {
  tasks: types.optional(types.array(TaskModel), []),
  selectedTask: types.maybeNull(
    types.reference(types.late(() => TaskModel)),
  ),
  checkedFilterId: types.optional(types.string, ''),
})
  .actions(self => ({
    loadTasks: flow(function* loadTasks() {
      const response = yield tasksApi.getTasksTitles();

      if (Array.isArray(response) && response.length) {
        applySnapshot(self.tasks, mapTasksTitles(response));
      }
    }),
    addTask(title) {
      self.tasks.push({
        ...getTaskSchema(),
        title,
      });
    },
    removeTask(task) {
      self.unpinTask();
      destroy(task);
    },
    pinTask({ id }) {
      self.selectedTask = id;
    },
    unpinTask() {
      self.selectedTask = null;
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
