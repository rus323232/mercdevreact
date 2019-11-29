import { types } from 'mobx-state-tree';

import TasksStore, { initialState } from '../tasks-store';

/**
 * Немного не понял, где лучше хранить initialState для моделей и в каком месте их прокидывать
 * сделал, пока запилил так, но мне кажется это не правильно */

const RootStore = types.model('RootStore', {
  tasksStore: types.optional(TasksStore, initialState),
});

export default RootStore.create({});
