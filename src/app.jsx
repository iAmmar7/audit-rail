import { AppProvider } from './contexts/AppContext';

export function rootContainer(container) {
  return <AppProvider>{container}</AppProvider>;
}
