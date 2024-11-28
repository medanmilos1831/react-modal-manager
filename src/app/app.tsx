import { OverlayProvider } from '../OverlayProvider';
import { HomePage } from '../pages/HomePage';
const App = () => {
  return (
    <OverlayProvider>
      <HomePage />
    </OverlayProvider>
  );
};

export { App };
