import { BrowserRouter as Router } from 'react-router-dom';

// routes
import AppRoutes from './routes/AppRoutes';
import { useState, useEffect } from 'react';

const App = () => {
  const [colorMode, setColorMode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (
      localStorage.getItem('VCLASS_COLOR_MODE') === 'dark' ||
      (!('VCLASS_COLOR_MODE' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setColorMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setColorMode('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <AppRoutes colorMode={colorMode} />
    </Router>
  );
};

export default App;
