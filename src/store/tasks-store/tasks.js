import {
  flow,
  types,
  destroy,
  getRoot,
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
}).actions((self) => {
  /**
   * Не понял как лучше добираться до родителькой модели
   * Официальный туториал говорит делать так getParent(self, 2)
   * но этот вариант выглядит убого. Из всего что нашел это
   * getRoot(self) и вниз по дереву моделей и тупо заменить
   * getParent(self, 2) на getParent(getParent(self))
   * Можно еще отказаться от методов в самой итерируемой модели
   * и определить все в родителе, но это тоже я так понимаю не лучший подход
   * */
  const parentModel = getRoot(self).tasksStore;

  return ({
    toggle() {
      self.isDone = !self.isDone;
    },
    pin() {
      parentModel.pinTask(self);
    },
    unpin() {
      parentModel.unpinTask();
    },
    remove() {
      parentModel.removeTask(self);
    },
  });
}).views((self) => {
  const parentModel = getRoot(self).tasksStore;

  return ({
    get isTaskPinned() {
      const { selectedTask } = parentModel;

      if (!selectedTask) {
        return false;
      }

      return self.id === selectedTask.id;
    },
  });
});

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
