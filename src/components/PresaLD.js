import React, { useState, useEffect } from 'react';
import Tutoriels from './Tutoriels';
import Arrow from '../assets/up.png';
import List from '../assets/list.png';
import Tuto from '../assets/play-button.png';
import EnterFullscreen from '../assets/fullscreen.png';
import ExitFullscreen from '../assets/exit_fullscreen.png';

import Query from '../tools/Query';

import "../styles/Lifedomus.css";
import { Document, Page, pdfjs } from "react-pdf";
import ExoPortee from './ExoPortee';
import ExoReseau from './ExoReseau';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PresaLD(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [presa, setPresa] = useState([]);
    const [partie, setPartie] = useState(0);
    const [ranges, addRange] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [tuto, setTuto] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);


    useEffect(() => {
        new Query("lifedomus_presa", props.id).get()
        .then(response => response.json())
        .then(data => {
          setPresa(data.reverse());
          addRange(data.map(el => 1));
        });  
    },[]);

    const changePage = (i) => {
      let newPage = pageNumber+i;
      if (newPage > ranges[partie] && partie < presa.length){
        setPartie(partie+1);
        setPageNumber(1);
      } else if(newPage < 1 && partie > 0){
        setPartie(partie-1);
        if(ranges[partie-1] > 1){
          setPageNumber(ranges[partie-1]);
        } else {
          setTimeout(setPageNumber(ranges[partie-1]), 500);
        }
      } else {
        setPageNumber(newPage);
      }
    }

    const updatePages = (data) => {
      console.log(data);
      let newArr = [...ranges];
      newArr[partie]=data._pdfInfo.numPages;
      addRange(newArr);
    }

    const renderDots = () => {
      let dots = [];
      for(let i=1; i <= ranges[partie]; i++){
          dots.push(<li key={i} className={i===pageNumber ? "progress-dot-dark progress-dot-light":"progress-dot-light"}></li>);
      }
      return dots;
    }

    const handleNav = (index) => {
      setPartie(index);
      setPageNumber(1);
      setOpenMenu(false);
    }

    const handlePress = (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 37) {
        console.log("ArrowLeft");
        changePage(-1);
      } else if (e.keyCode === 39) {
        console.log("ArrowRight")
        changePage(1);
      }
    }

    const handleClick = () => {
      setTuto(true);
      setFullscreen(false);
    }


    return (
      <div className="fullwidth" >
        <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
        {!tuto &&
        <div className="sommaire" onClick={() => setOpenMenu(true)} >
          <img src={List} className="icone" alt="" />  
        </div> 
        }
        <div className={openMenu ? "backdrop open" : "backdrop"} onClick={() => setOpenMenu(false)}></div>
        <div className={openMenu ? " summary drawer left open" : "summary drawer left"}>
          <ul>
          {presa.length >0 &&
          presa.map((el, i) => 
            <li onClick={() => handleNav(i)} >{(i+1) + ". " + el.acf.titre}</li>
          )
          }
          </ul>
        </div>
        {presa.length > 0 ?
        <div className={fullscreen ? "fullwidth flex center back_vert fullscreen" : "fullwidth flex center back_vert"} tabIndex="0" onKeyDown={handlePress} >
            {pageNumber + partie > 1 &&  
              <img src={Arrow} className="arrow_left" onClick={() => changePage(-1)} alt="" />
            }
            {presa[partie].acf.pdf ?
            <Document
            loading="Chargement de la présentation..."
            file={presa[partie].acf.pdf}
            onLoadError={(error) => {
              console.error("Load error")
              console.error(error)
              debugger
            }}
            onLoadSuccess={updatePages}
            onSourceError={(error) => {
              console.error("Source error")
              console.error(error)
              debugger
            }}
            >
              <Page pageNumber={pageNumber}
              renderTextLayer={false}
              height={window.innerHeight-60}
               />
            </Document>
            :
            presa[partie].acf.ex_interactif === "Absorption des ondes" ?
            <ExoPortee />
            :
            <ExoReseau />
          }
            {presa.length > 0 && pageNumber === ranges[ranges.length-1] && partie === presa.length-1 ?
            null :
              <img src={Arrow} 
              className="arrow_right" 
              onClick={() => changePage(1)} alt=""/>
            }
            {ranges && !presa[partie].acf.ex_interactif && !tuto &&
            <ul className="progress-dot-bar lifedomus">
            {renderDots()}
            </ul>
            }
            {ranges && presa[partie].acf.lien_tuto && !tuto &&
              <div className="lien_tuto" onClick={handleClick} >
                <img src={Tuto} className="icone to_white" alt="" />
              </div>
            }
            {tuto &&
            <div className="popup_fullscreen">
              <Tutoriels tuto={props.tuto} retour={() => setTuto(false)}/>  
            </div>
            }
            <img src={fullscreen ? ExitFullscreen : EnterFullscreen} className="icone black_to_grey enter_fullscreen"  onClick={() => setFullscreen(!fullscreen)} alt="" />
        </div>
        :
        <p>Chargement de présentation...</p>
      }
      </div>
    );
}
