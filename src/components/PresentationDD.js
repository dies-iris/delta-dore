import React, { useState } from "react";
import SplashScreen from './SplashScreen';
import '../styles/Histoire.css';
import MenuDD from "./MenuDD";
import MenuRadio from "./MenuRadio";
import Arrow from '../assets/up.png';

export default function PresentationDD (props) {

  const [splashscreen,setSplash]=useState(true);
  const [page,setPage] = useState('');

  return (
    <div className="fullwidth">
    {
      page === 'dd' ?
        <div className="fullwidth">
          <img src={Arrow} className="retour"  onClick={() => setPage('')} alt="retour"/>
          <MenuDD splashscreen={props.splashscreen}/>
        </div>
      : page === 'radio' ?
        <div className="fullwidth">
          <img src={Arrow} className="retour"  onClick={() => setPage('')} alt="retour"/>
          <MenuRadio splashscreen={props.splashscreen}/>
        </div>
      :
        <div className="menu_presentation_dd">
        <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
          {
          splashscreen &&
            <SplashScreen data={props.splashscreen} stop={() => setSplash(false)} />
          } 
          <div onClick={() => setPage('dd')} className="carte_menu_presentation_dd" style={{backgroundImage:'url('+props.splashscreen.fond1+')'}}>
            <h2>DELTA DORE</h2>
          </div>
          <div onClick={() => setPage('radio')} className="carte_menu_presentation_dd" style={{backgroundImage:'url('+props.splashscreen.fond2+')'}}>
            <h2>TECHNOLOGIE<br></br>RADIO</h2>
          </div>
        </div>
    }

    </div>
  )
}