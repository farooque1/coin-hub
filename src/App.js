import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./Component/Page/LayoutComponent";
import Home from "./Component/Page/HomeComponent";
import Overview from "./Component/Page/OverviewComponent";
import History from "./Component/Page/HistoryComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/overview/:name" element={<Overview />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
