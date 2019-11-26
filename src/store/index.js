import tasks from './tasks';
import { STORE_MODULES } from '../core/constants';

export default {
  [STORE_MODULES.TASKS]: tasks.create({}),
};
