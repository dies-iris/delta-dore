import React, { useEffect, useState } from "react";
import '../styles/Histoire.css';
import Histoire from "./Histoire";
import Draggable from 'react-draggable';
import Panneau from '../assets/Icone_panneau.png';
import Chiffre from '../assets/Icone_chiffre.png';
import Chrono from '../assets/chrono1.png';
import Arrow from '../assets/up.png';
import Query from '../tools/Query';

export default function MenuDD (props) {

  const [page,setPage] = useState('');
  const [datas,setDatas] = useState();
  const [slide,setSlide] = useState(0);

  useEffect(() => {
    new Query("implantation_chiffre").get()
    .then(response => response.json())
    .then(data => setDatas(data));  
  }, []);

  let dataImplant =[];
  let dataChiffres = [];
  let limitImplant;
  let limitChiffres;

  if(datas){
    for(let i=0;i<datas.length;i++){
      if(datas[i].acf["partie"] === "1"){
        // Implantation
        for(let j=0;j<Object.keys(datas[i].acf).length+1;j++){
          if(datas[i].acf["slide_"+j]){
            dataImplant.push(datas[i].acf["slide_"+j]);
          }
        }
        limitImplant = dataImplant.length;        
      } else if (datas[i].acf['partie'] === "2"){
        // Chiffres
        for(let j=0;j<Object.keys(datas[i].acf).length+1;j++){
          if(datas[i].acf["slide_"+j]){
            dataChiffres.push(datas[i].acf["slide_"+j]);
          }
        }
        limitChiffres = dataChiffres.length;
      }
    }    
  }

  function changeSlide (i, limit) {
    let newSlide=slide+i;
    if(newSlide < 0){
        setSlide(limit)
    } else if (newSlide > limit){
        setSlide(0);
    } else {
        setSlide(newSlide);
    }
  }

  function back (){
    setPage('');
    setSlide(0);
  }

  let length = 200 + 1547 - window.innerWidth;

  return (
    <div className="fullwidth"> 
    {
      page === 'dd' ?
        <div className="fullwidth">
          <img src={Arrow} className="retour"  onClick={() => setPage('')} alt="retour"/>
          <Histoire/>
        </div>

      : page === 'localisation' ?

        <div className="fullwidth">
          <img src={Arrow} className="retour"  onClick={() => back()}alt="retour"/>
          {
            slide > 0 &&
            <img src={Arrow} className="arrow_left" onClick={() => changeSlide(-1, limitImplant)}alt="pre"/>
          }
          <img src={dataImplant[slide]} className="slideFull" alt=""/>
          {
            slide < limitImplant-1 &&
            <img src={Arrow} className="arrow_right" onClick={() => changeSlide(1, limitImplant)}alt="suiv"/>
          }
          <ul className="progress-dot-bar">
          {dataImplant.map((el, i) => 
            <li key={i} className={i===slide ? "progress-dot-dark progress-dot-light":"progress-dot-light"} onClick={()=>setSlide(i)}></li>
          )}
          </ul>
        </div>

      : page === 'chiffres' ?

      <div className="fullwidth">
        <img src="https://deltadore.buroscope.eu/wp-content/uploads/logo-explose.gif" className="logo_explose"/>
        <img src={Arrow} className="retour"  onClick={() =>  back()}alt="retour"/>
        {
          slide > 0 &&
          <img src={Arrow} className="arrow_left" onClick={() => changeSlide(-1, limitChiffres)} alt="pre"/>
        }
        <img src={dataChiffres[slide]} className="slideFullChiffres" alt=""/>
        {
          slide < limitChiffres-1 &&
          <img src={Arrow} className="arrow_right" onClick={() => changeSlide(1, limitChiffres)}alt="suiv"/>
        }
        <ul className="progress-dot-bar">
        {dataChiffres.map((el, i) => 
          <li key={i} className={i===slide ? "progress-dot-dark progress-dot-light":"progress-dot-light"} onClick={()=>setSlide(i)}></li>
        )}
        </ul>
      </div>

      :

      <div className="fullwidth menu_dd_container"   style={{backgroundImage:'url('+props.splashscreen.fond3+')'}}>
        <Draggable
        axis="x"
        bounds={{top: 0, left: -length, right: 0, bottom: 0}}
        >
          <div id="menu_dd">
            <div onClick={() => setPage('dd')} className="carte_menu_dd">
              <h2>CHRONOLOGIE
                <span></span>
              </h2>
              <img id="chrono" src={Chrono} alt=""/>
            </div>
            <div onClick={() => setPage('localisation')} className="carte_menu_dd">
              <h2>LOCALISATION
                <span></span>
              </h2>
              <img id="panneau"  src={Panneau}alt="" />
            </div>
            <div onClick={() => setPage('chiffres')} className="carte_menu_dd">
              <h2>CHIFFRES
                <span></span>
              </h2>
              <img id="chiffre" src={Chiffre}alt="" />
            </div>
          </div>
        </Draggable>
      </div>
    }

    </div>
  )
}