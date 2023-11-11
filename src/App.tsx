import React from 'react';
import Oauth from './pages/Login';
import  Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OauthJump from './pages/OauthJump';
import Project from './pages/Project';





function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Oauth />} />
          <Route path="oauth/jump/" element={<OauthJump />} />
          <Route path="dashboard/" element={<Dashboard />} />
          {/* <Route path="project/" element={<Dashboard />} /> */}
          <Route path="project/:id" element={<Project />} />
        </Routes>
      </div>
    </BrowserRouter>
  ); 
}
export default App;


