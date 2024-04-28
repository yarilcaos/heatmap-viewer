import React from 'react';
import { useState } from "react";
import logo from './lomodelQData?: nullmodelQData: nullgo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';

import HomeScreen from './components/HomeScreen';
import DataLoadingScreen from './components/DataLoadingScreen';
import DataVisualizationScreen from './components/DataVisualizationScreen';


//https://www.jsdelivr.com/package/npm/@creativebulma/bulma-tooltip



function App() {
  const [data, setPage] = useState({
    page: "Home",
    modelQData:null
  });
  function setDataQ(new_data: any) {
    setPage({
      ...data,
      modelQData:new_data,
    })
  }

  function openPage(pageName: string) {
    setPage({
      ...data,
      page:pageName,
    })
  }

  return (
    <div className="App">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <button className="navbar-item" onClick={()=> openPage("Home")}>
            <b>Cesar Yaril Velazquez </b>&nbsp; 1536-well microtiter plate viewer
          </button>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
              <button className="" onClick={()=> openPage("Home")}>
                  <strong>Home</strong>
                </button>
                <p></p><p></p>
                <button className="button" onClick={()=> openPage("DataLoading")}>
                  <strong>Load new file</strong>
                </button>
                <button className="button" onClick={()=> openPage("DataVisualization")}>
                  <strong>View Heat Map</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
           {data.page==="Home"? <HomeScreen handlerOpenPage={openPage}/>:null }
           {data.page==="DataLoading"? <DataLoadingScreen handlerOpenPage={openPage} handlerSetData={setDataQ} />:null }
           {data.page==="DataVisualization"? <DataVisualizationScreen data={data.modelQData} />:null }
      </div>
    </div>
  );
}

export default App;
