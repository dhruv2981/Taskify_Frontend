import React from 'react';
import Oauth from './pages/Login';
import  Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OauthJump from './pages/OauthJump';
import Project from './pages/Project';
import Card from './pages/Card';
import CardModal from './components/Modals/cardModal';
import Testing from './pages/testing'
import { Toaster } from "react-hot-toast";






function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Oauth />} />
          <Route path="/oauth/jump/" element={<OauthJump />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          {/* <Route path="project/" element={<Dashboard />} /> */}
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/card/:id" element={<Card />} />
          <Route path="/test" element={<Testing />} />
        </Routes>
        <Toaster></Toaster>
      </div>
    </BrowserRouter>
  ); 
}
export default App;


