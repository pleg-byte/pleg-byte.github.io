import "./App.css";
import JoySignInSideTemplate from "./screens/Signup";
import Verification from "./screens/Verfication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetCRBStatusChecker from "./screens/GetCRBStatusChecker";
import CRBStatusReport from "./screens/CRBStatusReport";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<JoySignInSideTemplate />} />
          <Route path="eligibility" element={<JoySignInSideTemplate />} />
          <Route path="get" element={<GetCRBStatusChecker />} />
          <Route path="verify" element={<Verification />} />
          <Route path="report" element={<CRBStatusReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
