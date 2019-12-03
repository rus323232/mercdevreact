/* eslint no-console: 0 */
import { API } from '../core/constants';

export const getTasksTitles = async () => {
  try {
    const data = await fetch(API);
    return await data.json();
  } catch (e) {
    console.error(e);
  }
  return [];
};
