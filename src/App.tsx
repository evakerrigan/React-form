import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { UncontrolledForm } from './components/UncontrolledForm';
import { ReactHookForm } from './components/ReactHookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
