import { types } from 'mobx-state-tree';

import TasksStore, { initialState } from '../tasks-store';

/**
 * Не понял, где лучше хранить initialState для моделей и в каком месте их прокидывать
 * пока запилил так, но мне кажется это не правильно
 */

const RootStore = types.model('RootStore', {
  tasksStore: types.optional(TasksStore, initialState),
});

export default RootStore.create({});
