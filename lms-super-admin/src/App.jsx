import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import CreateSchoolPage from './pages/SchoolCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/create-school" element={<CreateSchoolPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
