import { BrowserRouter as Router } from "react-router-dom";

// routes
import AppRoute from "./routes/AppRoute";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('VCLASS_COLOR_MODE') === 'dark' || (!('VCLASS_COLOR_MODE' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <Router>
      <AppRoute />
    </Router>
  )
}

export default App;
