import ReactDOM from 'react-dom/client';

// components
import App from './App';

// styling
import './index.css';

// context
import { ThemeProvider } from './context/ThemeContext';
// import { UserInfoProvider } from './context/UserInfoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    {/* <UserInfoProvider> */}
    <App />
    {/* </UserInfoProvider> */}
  </ThemeProvider>
);
