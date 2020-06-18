import React, {useEffect, useState } from "react";
import SplashScreen from './SplashScreen';
import Draggable from 'react-draggable';
import Query from "../tools/Query";
import MenuSSMC from "./MenuSSMC";
import MenuSSEDC from "./MenuSSEDC";
import FichePresentationProduit from './Tyxal/FichePresentationProduit';
import Arrow from '../assets/up.png';

export default function MenuMC (props) {

  const [splashscreen,setSplash]=useState(true);
  const [cat,setCat]=useState([]);
  const [openSSEDC,setOpenSSEDC]=useState(false);
  const [page,setPage] = useState();
  const [bloc,setBloc]=useState([]);
  const [tydom, setTydom] = useState();
  const length = cat && cat.length/2 * (200+30) + window.innerWidth*0.1 - window.innerWidth;

  useEffect(() => {
    new Query("categories").get()
      .then(response => response.json())
      .then(data => {
        setCat(data)
      });  
  },[]);

  useEffect(() => {
    new Query("mcpresentation").get()
      .then(response => response.json())
      .then(data => setBloc(data.reverse()));  
  },[]);
  
  useEffect(() => {
    new Query("tydom").get()
      .then(response => response.json())
      .then(data => setTydom(data));  
  },[]);

console.log(bloc);
  return (
    <div className="fullwidth" >  
      <img src={Arrow} alt='retour' className="retour" onClick={props.retour} /> 
      {
        splashscreen &&
        <SplashScreen data={props.splashscreen} stop={() => setSplash(false)} />
      }  
      {page && page !== "tydom" ?
      
        <MenuSSMC cat={page} bloc={bloc && bloc.filter(el => el.categories.includes(page.id))} retour={()=>setPage()} fond={props.splashscreen.fond2}/>
        :
        page === "tydom"?
        <FichePresentationProduit produit={tydom} fond={props.splashscreen} retour={() => setPage('')} />
        :
        openSSEDC?
        <MenuSSEDC cat={cat} ids={cat.map(el => el.id)} fond={props.splashscreen.fond1} retour={() => setOpenSSEDC(false)} />
        :
        cat.length > 0 ? 
          <div className="fullwidth hidden back_vert_clair" > 
          <Draggable axis="x" 
          bounds={{top: 0, left: length > 0 ? -length : 0, right: 0, bottom: 0}}>  
            <div className="menuMC">
              {cat.map(el => (
              <div className="boutonMenuMC" key={el.id} onClick={el.name==="Tydom" ? ()=>setPage('tydom') : ()=>setPage(el)}>
                  <img src={el.acf.icone} alt={el.name} />
                  <h3>{el.name}</h3>
              </div>
              ))}
            </div>
          </Draggable>
            <div className="boutonMenuEDC text_blanc" onClick={()=>setOpenSSEDC(true)}>
              <h3>Etude de cas</h3>
            </div>
          </div>
          : 
          <div>en cours...</div>
      }
    </div>
  )
}