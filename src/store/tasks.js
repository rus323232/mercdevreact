import { types } from 'mobx-state-tree';
import { values } from 'mobx';

import StoreTypes from './store-types';
import { randomId } from '../core/utils';

const initialState = {
  tasks: [
    {
      id: randomId(),
      isDone: true,
      title: 'Initial done task',
      date: new Date().toISOString(),
    },
    {
      id: randomId(),
      isDone: false,
      title: 'Initial undone task',
      date: new Date().toISOString(),
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
}));

const TasksStore = types.model(StoreTypes.TasksStore, {
  tasks: types.array(TaskModel),
}).views(self => ({
  get tasksWhichIsDone() {
    return values(self.tasks).filter(task => task.isDone);
  },
}));

export default TasksStore.create(initialState);
