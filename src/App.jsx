import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
    </Router>
  );
};

export default App;