import React, { useState, useEffect } from "react";
import Query from "../../tools/Query";
import SplashScreen from '../SplashScreen';
import Arrow from '../../assets/up.png';
import GammeTyxal from "./GammeTyxal";
import ActivitesTyxal from "./ActivitesTyxal";

export default function Tyxal(props) {

  const [splashscreen,setSplash]=useState(true);
  const [page,setPage] = useState('');
  const [produits, setProduits] = useState([]);
  const [edc, setEdc] = useState();
  const [catTyxal, setCatTyxal] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    new Query("categorie_tyxal").get()
      .then(response => response.json())
      .then(data => {
        setCatTyxal(data);
        getProduits(data.map(el=>el.id));
        getEdc(data.map(el=>el.id));
      });  
  },[]);

  const getProduits = (ids) => {
    new Query("produitsTyxal", ids).get()
      .then(response => response.json())
      .then(data => {
        setProduits(data);
        setLoaded(true);
      });  
  }
  
  const getEdc = (cat) => {
    new Query("edcTyxal", cat).get()
      .then(response => response.json())
      .then(data => setEdc(data));  
  }



  return (
      <div className="fullwidth">
      <img src={Arrow} alt='retour' className="retour" onClick={props.retour} /> 
      {
          splashscreen &&
          <SplashScreen data={props.splashscreen} stop={() => setSplash(false)} />
      }        
      {
          page === 'gammeTyxal' ?
          <div className="fullwidth">
            <img src={Arrow} className="retour"  onClick={() => setPage('')} alt=""/>
            <GammeTyxal fond={props.splashscreen} loaded={loaded} edc={edc} catTyxal={catTyxal} produits={produits} />
          </div>
        : page === 'activitesTyxal' ?
            <ActivitesTyxal fond={props.splashscreen} produits={produits} catTyxal={catTyxal} retour={setPage} />
        :
          <div id="menu_presentation_dd" className="menu_presentation_tyxal">
            <div onClick={() => setPage('gammeTyxal')} className="carte_menu_presentation_dd " style={{backgroundImage : "url("+props.splashscreen.fond1+")", backgroundColor:"#d7eae3"}} fond={props.fond}  >
              <h2>GAMME<br></br>TYXAL+</h2>
            </div>
            <div onClick={() => setPage('activitesTyxal')} className="carte_menu_presentation_dd" style={{backgroundImage : "url("+props.splashscreen.fond2+")"}}>
              <h2>ETUDE DE CAS</h2>
            </div>
          </div>
      }
      </div>
  )
}

