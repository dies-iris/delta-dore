import React, { useState, useEffect } from 'react';
// import GlobalFonts from './fonts/fonts';
import Query from './tools/Query';
import Menu from "./components/Menu";
import Scenarios from "./components/Scenarios";
import MenuPrincipal from './components/MenuPrincipal';
import MenuMC from './components/MenuMC';
import PresentationDD from './components/PresentationDD';
import Tyxal from './components/Tyxal/Tyxal';
import { AUTH_TOKEN} from './tools/helper';


import './App.css';
import Formations from './components/Formations';
import Login from './components/Login';
import Lifedomus from './components/Lifedomus';


function App() {
  const [ecran, setEcran]=useState(localStorage.getItem(AUTH_TOKEN) ? 'accueil' : 'login');
  // const [ecran, setEcran]=useState('accueil');
  const [splashscreens, setSplash]=useState([]);
  const [menu, setMenu]=useState('accueil');

  useEffect(() => {
    new Query("presentation").get()
      .then(response => response.json())
      .then(data => setSplash(data.map(splash => splash.acf)));  
  },[]);



  const renderSwitch = (screen) => {
    switch(screen) {
      case 'login':
        return <Login setEcran={() => setEcran("accueil")}/>;
      case 'accueil':
        return <Scenarios setMenu={setMenu} setEcran={() => setEcran("menu")} />;
      case 'menu':
        return <MenuPrincipal data={splashscreens} setEcran={setEcran} menu={menu} />;
      case 'presa':
        return <PresentationDD splashscreen={splashscreens.find(sp => sp.id==="1" )} retour={() => setEcran("menu")} />;
      case 'mc':
        return <MenuMC splashscreen={splashscreens.find(sp => sp.id==="2" )} retour={() => setEcran("menu")} />;
      case 'tyxal':
        return <Tyxal splashscreen={splashscreens.find(sp => sp.id==="3" )} retour={() => setEcran("menu")}/>;
      case 'lifedomus':
        return <Lifedomus splashscreen={splashscreens.find(sp => sp.id==="4" )} retour={() => setEcran("menu")}/>;
      case 'formation':
        return <Formations splashscreen={splashscreens.find(sp => sp.id==="5" )} retour={() => setEcran("menu")}/>;
      default :
        return <MenuPrincipal setEcran={setEcran} />;
    }
  }

  return (
  <div>
      {/* <GlobalStyle /> */}
    <div className="App">
      {/* <GlobalFonts /> */}
        <img src="/wp-content/uploads/logo-recompose.gif" className="logo_recompose" alt=""/>
        {splashscreens.length > 0 ?
          <div className="fullwidth">
            <div className="ecran">
              {renderSwitch(ecran)}
            </div>
            <Menu setEcran={setEcran} login={ecran==="login" ? true : false} />
          </div>
        :
        //TODO: Logo de DeltaDore animé
        <div>...en cours</div>
      }
    </div>
  </div>
  );
}

export default App;
