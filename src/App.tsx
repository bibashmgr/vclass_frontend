import { BrowserRouter as Router } from "react-router-dom";

// routes
import { AppRoute } from "./routes/AppRoute";

const App = () => {
  return (
    <Router>
      <AppRoute />
    </Router>
  )
}

export default App;
