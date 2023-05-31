


import './App.css';
import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import PoliceHome from './Components/PoliceHome';
import NewFIR from './Components/NewFIR';
import ViewCase from './Components/ViewCase';
import Forensics from './Components/CrimeDetails/Forensics';
import ForensicsHome from './Components/ForensicHome';
import ViewForensic from './Components/ViewForensic';
import CrimeScenePhotographs from './Components/CrimeScenePhotographs';
import ViewCaseF from './Components/ViewCaseF';

function App() {
 
  return (
    
    <Routes>
       <Route path="/" element={<Home/> } />
       <Route path="/login" element={<Login />} />
       <Route path="/police" element={<PoliceHome/>} />  
       <Route path="/newfir" element={<NewFIR/>} />
       <Route path = "/police/viewcase/:caseId" element = {<ViewCase/>}/>
       <Route path = "/forensichome/viewcase/:caseId" element = {<ViewCaseF/>}/>
       <Route path="/forensichome/forensicUpdate/:caseId" element={<ViewForensic/>} />
       <Route path="/crimephotos/:caseId" element={<CrimeScenePhotographs/>}/>

       <Route path="/forensichome" element={<ForensicsHome/>} />     
       <Route path = "crimedata/forensics/:caseId/" element = {<Forensics/>}/>
      
   </Routes>
    
  );

}

export default App;

/*
<Route path="/newfir" component={NewFIR} />
<Route path="/viewcase/:caseId" component={ViewCase} />
<Route path="/forensichome" component={ForensicsHome} />
        <Route path="/crimedata/forensics/:caseId/" component={Forensics} />
        <Route path="/forensicUpdate/:caseId" component={ForensicUpdate} />*/

/*<Switch>
        <Redirect exact from="/" to="/home" />
        </Switch>*/





