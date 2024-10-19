import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import FullPageLoader from "./components/FullPageLoader";

const AppRoutes = lazy(() => import("./routes/AppRoutes"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<FullPageLoader />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
