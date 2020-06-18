import React, { useState, useEffect } from "react";
import Query from '../tools/Query';
import "../styles/Radio.css";
import Arrow from '../assets/up.png';
import AvantagesRadio from './AvantagesRadio';
import SliderRadio from './SliderRadio';


export default function MenuDD (props) {

  const [data, setData] = useState([]);
  const [dataAvantages, setDataAvantages] = useState([]);
  const [dataTransmissions, setDataTransmissions] = useState([]);
  const [dataMaillage, setDataMaillage] = useState([]);
  const [dataCablages, setDataCablages] = useState([]);
  const [page,setPage] = useState('');
  const [title,setTitle] = useState(true);

  useEffect(() => {
    new Query("radio").get()
      .then(response => response.json())
      .then(data => setData(data));  
  },[]);

  // Change la page et affecte les données de la partie concernée
  function changePage(page){
    for(let i=0;i<data.length;i++){
      if(data[i].acf.section_radio === "avantages" && page === "avantages"){
        setDataAvantages(data[i].acf);
      } else if(data[i].acf.section_radio === "transmissions" && page === "transmissions"){
        dataTransmissions.push(data[i].acf);
      } else if(data[i].acf.section_radio === "maillage" && page === "reseau"){
        dataMaillage.push(data[i].acf);
      } else if(data[i].acf.section_radio === "cablages" && page === "cablages"){
        dataCablages.push(data[i].acf);
      }
    }
    setPage(page);
  }
  
  // Fonction retour, vide les tableaux de données
  function goBack(){
    setDataTransmissions([]);
    setDataMaillage([]);
    setDataCablages([]);
    setPage('');
    setTitle(true);
  }

  return (
    <div className="fullwidth">
    {
      page === 'avantages' ?
        <div className="fullwidth" style={{backgroundImage:'url('+props.splashscreen.fond6+')'}}>
          <img src={Arrow} className="retour"  onClick={() => goBack()} alt="retour"/>
          <div id="radio_avantages">
            <div id="container_avantages">
              <h2>Les avantages<span></span></h2>

              <AvantagesRadio data={dataAvantages}/>
              
            </div>
          </div>
          
        </div>
      : page === 'transmissions' ?
        <div className="fullwidth" style={{backgroundImage:'url('+props.splashscreen.fond2+')'}}>
          {
          title && 
            <div className="title_radio" onClick={()=>setTitle(false)} style={{backgroundImage:'url('+props.splashscreen.fond8+')'}}>
              <h2 className="souligne jaune">X3D La technologie radio de Delta Dore</h2>
            </div>
          }
          <img src={Arrow} className="retour"  onClick={() => goBack()} alt="retour"/>
          <SliderRadio data={dataTransmissions}/>
        </div>
      : page === 'reseau' ?
        <div className="fullwidth" style={{backgroundImage:'url('+props.splashscreen.fond4+')'}}>
          {
          title && 
            <div className="title_radio" onClick={()=>setTitle(false)} style={{backgroundImage:'url('+props.splashscreen.fond9+')'}}>
              <h2 className="souligne jaune">Le réseau maillé</h2>
            </div>
          }
          <img src={Arrow} className="retour"  onClick={() => goBack()} alt="retour"/>
          <SliderRadio data={dataMaillage}/>

        </div>
      : page === 'cablages' ?
        <div className="fullwidth" style={{backgroundImage:'url('+props.splashscreen.fond7  +')'}}>
          {
          title && 
            <div className="title_radio" onClick={()=>setTitle(false)} style={{backgroundImage:'url('+props.splashscreen.fond10+')'}}>
              <h2 className="souligne jaune">Le câblage</h2>
              <span>émetteur => récepteur</span>
            </div>
          }
          <img src={Arrow} className="retour"  onClick={() => goBack()} alt="retour"/>
          <SliderRadio data={dataCablages}/>

        </div>
      :
          <div id="menu_radio" style={{backgroundImage:'url('+props.splashscreen.fond5+')'}}>
            <div onClick={() => changePage('avantages')} className="carte_menu_radio">
              <h2>AVANTAGES</h2>
            </div>
            <div onClick={() => changePage('transmissions')} className="carte_menu_radio">
              <h2>TRANSMISSIONS</h2>
            </div>
            <div onClick={() => changePage('reseau')} className="carte_menu_radio">
              <h2>RÉSEAU MAILLÉ</h2>
            </div>
            <div onClick={() => changePage('cablages')} className="carte_menu_radio">
              <h2>CÂBLAGES</h2>
            </div>
          </div>
    }

    </div>
  )
}