import React, { useEffect, useState } from "react";
import Query from "../../tools/Query";
import Draggable from 'react-draggable';
import Arrow from '../../assets/up.png';
import FonctionnalitesTyxal from "./FonctionnalitesTyxal";
import "../../styles/tyxal.css"
import PacksTyxal from "./PacksTyxal";
import ReactPlayer from "react-player";
import Fonctionnalite from '../../assets/Picto_MULTISITES.png';
import Packs from '../../assets/Picto_EVOLUTIVITE.png';




export default function GammeTyxal (props) {

  const [data,setData] = useState([]);
  const [page,setPage] = useState('');  
  const [slide,setSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [dataDrawer,setDataDrawer] = useState([]);
  let catTyxal = props.catTyxal;
  let produitSlideEnFairePlus =[];
  let dataPresentationGenerale = [];
  let dataEnFairePlus = [];
  let dataEnFairePlusProduit =[];
  let limitPresentationGenerale;
  let limitEnfairePlus;



  useEffect(() => {
    new Query("tyxal_slide").get()
      .then(response => response.json())
      .then(data => setData(data));  
  },[]);

  useEffect(() => {
    new Query("produits").get()
      .then(response => response.json())
      .then(data => setDataDrawer(data));  
  },[]);
  

  function changePage(page){
    for(let i=0;i<data.length;i++){
      if(data[i].acf.section_tyxal === "presentation"){
        dataPresentationGenerale.push(data[i].acf);
      } else if(data[i].acf.section_tyxal === "EnFairePlus"){
        for(let j=0;j<data[i].acf.section_tyxal.length;j++){
        dataEnFairePlus.push(data[j].acf);
        }
    } 
    setPage(page);
    }
  }


  function goBack(){
    setSlide(0);
    setPage('');
  }


  function changeSlide (i, limit) {
    let newSlide=slide+i;
    if(newSlide < 0){ 
        setSlide(limit) ;
    } else if (newSlide > limit){
        setSlide(0);
    } else {
        setSlide(newSlide);
    }
  } 



  if (dataEnFairePlus){
        for (let i=0; i<dataEnFairePlus.length;i++){
          if(dataEnFairePlus[i]){
            dataEnFairePlusProduit.push(dataEnFairePlus[i]);
          }
        }

    }

    if(data){
      for(let i=0;i<data.length;i++){
        if(data[i].slug === "presentation-generale"){
          for(let j=0;j<Object.keys(data[i].acf).length+1;j++){
            if(data[i].acf["slide_"+j]){
              dataPresentationGenerale.push(data[i].acf["slide_"+j]);
            }
          }
          limitPresentationGenerale = dataPresentationGenerale.length;
      } else if (data[i].slug === "en-faire-plus-avec-tyxal"){
          for(let j=0;j<Object.keys(data[i].acf).length+1;j++){
          if((data[i].acf["slide_"+j]) && 
                (
                  ((data[i].acf["slide_"+j].choix_visuel ==="video")&&((data[i].acf["slide_"+j].video.video).length>0)) 
                  ||((data[i].acf["slide_"+j].choix_visuel ==="video")&&((data[i].acf["slide_"+j].video.videoext)!=="")) 
                  ||((data[i].acf["slide_"+j].choix_visuel ==="video")&&((data[i].acf["slide_"+j].video.image)!== false)) 
                  ||((data[i].acf["slide_"+j].image).length>0)
                )
            ) {
              dataEnFairePlus.push(data[i].acf["slide_"+j]);
            }
          }
          limitEnfairePlus = dataEnFairePlus.length;
        }
      }    
    }


  function afficherProduitsSlide(){
  produitSlideEnFairePlus=[];
    for(let i=0;i<dataDrawer.length;i++){
      for(let j=0;j<dataEnFairePlusProduit[0].length+1;j++){
          if(dataDrawer[i].id === dataEnFairePlusProduit[0][j]){
                  produitSlideEnFairePlus.push(dataDrawer[i]);
                }  
      }}
  }

  const calculerLength = (long) => {
    let result = long * (150+20) - window.innerWidth;
    return result > 0 ? -result : 0;
  }


  let length = 200 + 2000 - window.innerWidth;
  
  return (
    <div className="fullwidth" > 
      {
          page === 'presentation' ?
            <div className="fullwidth">
              <img src={Arrow} className="retour"  onClick={() => goBack()}  alt=""/>
              
              <div className="containerSlideTyx">
              {
                slide > 0 &&
                <img src={Arrow} className="arrow_left arrow_left_radio" onClick={() => changeSlide(-1, limitPresentationGenerale)}alt="pre"/>
              }
              <div className="sscontainerSlideTyx">
              <img src={dataPresentationGenerale[slide]} className="slideTyx " alt="image_slide"/>
              </div> 
              {
                slide < limitPresentationGenerale-1 &&
                <img src={Arrow} className="arrow_right arrow_right_radio" onClick={() => changeSlide(1, limitPresentationGenerale)}alt="suiv"/>
              }
              <ul className="progress-dot-bar">
              {dataPresentationGenerale.map((el, i) => 
                <li key={i} className={i===slide ? "progress-dot-dark progress-dot-light":"progress-dot-light"} onClick={()=>setSlide(i)}></li>
              )}
              </ul> 
               
              </div>    
            </div>


        : page === 'fonctionnalites' ?
          
          <FonctionnalitesTyxal produits={props.produits}  catTyxal={catTyxal} edc={props.edc} fond={props.fond} loaded={props.loaded} changePage={()=>changePage()} retour={() => setPage('')}/>

        : page === 'packsTyxal' ?
                   
          <PacksTyxal produits={props.produits} catTyxal={catTyxal.find(el => el.slug === "packs_tyxal")} loaded={props.loaded} edc={props.edc.find(el => el.id === 1704)}  fond={props.fond} retour={() => setPage('')}/>
  
          : page === 'EnFairePlus' ?
          <div className="fullwidth hidden">
            <img src={Arrow} className="retour"  onClick={() => goBack()} alt=""/>
            <div className="containerSlideTyxEnFairePlus">
            {
                slide > 0 &&
                <img src={Arrow} className="arrow_left arrow_left_radio" onClick={() => {
                  setOpen(false);
                  changeSlide(-1, limitEnfairePlus)
                }}
                  alt="pre"/>
              }
              {dataEnFairePlus[slide].choix_visuel ==="video" && dataEnFairePlus[slide].video.video !== false ?
              <video className="videoSlide" width="100%" height="100%" object-position="cover" controls="controls" loop poster={(dataEnFairePlus[slide].video.image)!==false &&(dataEnFairePlus[slide].video.image)}  src={dataEnFairePlus[slide].video.video} type="video/mp4"></video>
              :dataEnFairePlus[slide].choix_visuel ==="video" && dataEnFairePlus[slide].video.videoext !== false ?
              <ReactPlayer className=" videoSlide"  url={dataEnFairePlus[slide].video.videoext} width="75%" height="75%" controls allowFullScreen 
              config={{
                youtube: {
                playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0, width:"100%"},
          
              }}}/>
              :dataEnFairePlus[slide].choix_visuel ==="image" && dataEnFairePlus[slide].image !== false &&
              <img src={dataEnFairePlus[slide].image} className="slideTyx FairePlus" alt="image_slide"/>
              }
              {dataEnFairePlus[slide].produit  &&
              dataEnFairePlusProduit.push(dataEnFairePlus[slide].produit)
              }
              {dataEnFairePlus[slide].produit && 
                afficherProduitsSlide()
              }
              {dataEnFairePlus[slide].produit && 
                <div className="boutonPlus" onClick={()=>setOpen(!open)}></div>
              }  
             
              <ul className="progress-dot-bar">
              {dataEnFairePlus.map((el, i) => 
                <li key={i} className={i===slide ? "progress-dot-dark progress-dot-light":"progress-dot-light"} onClick={()=>setSlide(i)}></li>
              )}
              </ul>
              </div>

              {open&& dataEnFairePlus[slide].produit && 
               <div className={open ? "drawerTyxal open" : "drawerTyxal "} >
                <div>
                  <Draggable
                  axis="x"
                  bounds={{top: 0, left: calculerLength(dataEnFairePlus[slide].produit.length), right: 0, bottom: 0}}
                  >
                    <ul className={produitSlideEnFairePlus.length > 9? "listProduitDrawerTyxal" :"listProduitDrawerTyxalFull"}>
                    {produitSlideEnFairePlus.length > 0 &&
                    produitSlideEnFairePlus.map((el,i) => (
                      <li key={i} >
                          <img className="list-produits-image" src={el.acf.image} alt="image_produit"/> 
                          <h3>{el.acf.titre}</h3>
                      </li>
                    ))} 
                    </ul> 
                  </Draggable>
                </div> 
              </div>  
              }
             
              {
                slide < limitEnfairePlus-1 &&
                <img id="arrowTyx" src={Arrow} className="arrow_right arrow_right_radio" onClick={() => {
                  setOpen(false);
                  changeSlide(1, limitEnfairePlus)
                }}
                  alt="suiv"/>
              }
          </div> 


       : <div className="fullwidth" style={{
          backgroundImage : "url("+props.fond.fond3+")",
          backgroundSize: "cover",
          position: "fixed",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat no-repeat",
          backgroundPositionX: "-400px",
          overflow:"hidden"
          }}>
            <Draggable
            axis="x"
            bounds={{top: 0, left: -length, right: 0, bottom: 0}}
            >
              <div id="menu_dd">
                <div onClick={() => changePage('presentation')} className="carte_menu_dd">
                  <h2>PRESENTATION GENERALE
                    <span></span>
                  </h2>
                </div>
                <div id="container-fonctions" onClick={() => changePage('fonctionnalites')} className="carte_menu_dd">
                  <h2>FONCTIONNALITES
                    <span></span>
                  </h2>
                  <img id="fonctions"src={Fonctionnalite} alt="picto_fonctionnalite" />
                </div>
              <div id="container-packs" className="carte_menu_dd" onClick={()=>setPage('packsTyxal')}>
                  <h2>PACKS
                    <span></span>
                  </h2>
                  <img id="packs"src={Packs} alt="picto_packs" />
              </div>
                <div onClick={() => changePage('EnFairePlus')}
                  className="carte_menu_dd">
                  <h2>EN FAIRE + <br/>AVEC TYXAL+
                    <span></span>
                  </h2>
                </div>
              </div>
            </Draggable>
        </div>
      }
    </div>
  )
}