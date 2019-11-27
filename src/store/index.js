import tasks from './tasks';
import StoreTypes from './store-types';

const store = {
  [StoreTypes.TasksStore]: tasks,
};

export {
  store as default,
  StoreTypes,
};
