import {
  useLocation,
} from 'react-router-dom';

export function useQuery(key) {
  return new URLSearchParams(useLocation().search).get(key);
}
