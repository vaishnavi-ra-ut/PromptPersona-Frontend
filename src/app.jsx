import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="p-8 bg-red-500">Welcome to PromptPersona 👋</h1>} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;