import './App.css';
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import PrivateArea from "./PrivateArea";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Private Area</h1>
        </header>
        <div className="App-Body">
          <span>
            <LoginButton/>
            <LogoutButton/>
          </span>

          <Routes>
            <Route path="/privatearea" element={<PrivateArea />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
