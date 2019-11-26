import { types } from 'mobx-state-tree';

const TaskModel = types.model('TaskModel', {
  isDone: types.boolean,
  text: types.string,
  date: types.string,
});

const TasksStore = types.model('TaskStore', {
  tasks: types.array(TaskModel),
});

export default TasksStore;
