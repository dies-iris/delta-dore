import React, { useState, useRef } from "react";
import upperCaseFirstLetter from "../tools/functions";
import {useRect} from "../tools/useRect";
import Draggable from 'react-draggable';
import Check from '../assets/check.png';
import List from '../assets/list.png';
import Arrow from '../assets/up.png';
import Delete from '../assets/trash.png';
import Close from '../assets/close.png';
import Popup from "./Popup";

import '../styles/etudeDeCas.css';

export default function DragAndDrop(props) {
    const [dragArr, setDragArr] = useState([]);
    const [dragId, setDragId]=useState();
    const [rotate, setRotate]=useState([]);
    const [corrige, setCorrige]=useState(false);
    const [open, setOpen] = useState(false);
    const [openProd, setOpenProd] = useState(false);
    const [openCat, setOpenCat] = useState(false);
    const [prodByCat, setProdByCat] = useState([]);
    const [info, setInfo] = useState();
    const [popup, setPopup] = useState(false);
    const [deltaPosition, setDelta] = useState({
      x: 0, y: 0
    });
    const poubelle = useRef();
    const produits = useRef();
    const prodParent = useRef();
    const contLength = useRect(prodParent).width;
    const refsArray = [];
    let bin = deltaPosition.x > useRect(poubelle).left-50 && dragArr.length > 0;

    // let length = data.length*(200+20) - contLength;
    let length2 = props.cat && props.cat.length*(200+20) - contLength;
    let length3 = prodByCat.length*(200+20) - contLength;


    const handleClick = (el) => {
      if(el.pack){
        let prod1=[];
        let prod2=[];
        //TODO : mettre le prix des produits inclus dans le pack à 0, sauf le premier => mettre le prix du pack
        if(el.prod1){
          prod1 = props.produits.filter(produit => el.prod1.includes(produit.id)).map((p,i) => {
          if(i === 0){
            p.acf.prix = el.prix;
          } else {
            p.acf.prix = 0;
          }
            return p.acf;
          });
        }
        if(el.prod2){ 
          prod2 = props.produits.filter(produit => el.prod2.includes(produit.id)).map((p,i) => {
          if(!prod1.length > 0 && i === 0){
            p.acf.prix = el.prix;
          } else {
            p.acf.prix = 0;
          }
            return p.acf;
          });
        }
        let arr = prod1.concat(prod2).concat(prod2);
        setDragArr(dragArr.concat(arr));
        setRotate(rotate.concat(arr.map(el => 0)));
      } else {
        setDragArr([...dragArr, el]);
        setRotate([...rotate, 0]);
      }
    }

    const handleRotate = (i) => {
      let newArr=[...rotate];
      newArr[i] +=1;
      setRotate(newArr);
    }

    const dragging = () => {
      let obj = refsArray[dragId].getBoundingClientRect();
      setDelta({
        x: obj.x,
        y: obj.y,
      });
    }

    const dragStart = (i) => {
      setDragId(i);
      setOpenCat(false);
      setOpenProd(false);
    }

    const renderDrag = (el,i) => {
      if(el !== ""){
          return(
          <Draggable 
          defaultPosition={{x: 250, y: 100}}
          onStart={() => dragStart(i)} 
          onDrag={dragging} 
          onStop={handleDragEnd}
          key={i} >
              <div className={dragId === i ? "box fond-transparent" : "box fond-transparent clair_dragged"} onClick={() => handleRotate(i)}>
                <img className="draggable" 
                ref={ref => { refsArray[i] = ref;}} 
                style={{transform:"rotate("+45*rotate[i]+"deg)"}}
                src={el.image} alt="" />
              </div>
          </Draggable>
          );
      }
    }

    const handleDragEnd = () => {
      if(poubelle.current && dragId >= 0 && deltaPosition.x > 0){
        let objX = deltaPosition.x+50;
        let objY = deltaPosition.y+50;
        let binLeft = poubelle.current.getBoundingClientRect().left-50;
        let binTop = poubelle.current.getBoundingClientRect().top-50;
        let binBottom = poubelle.current.getBoundingClientRect().bottom+50;
          if(objX >= binLeft && objY >= binTop && objY <= binBottom){
            let deleteTarget=dragId;
            dragDelete(deleteTarget);
            
          }
      }
      setDragId(-1);
    }

    const dragDelete = (i) => {
      setDelta({x:0, y:0});
      let newArr=[...dragArr];
      newArr[i] = "";
      setDragArr(newArr);
    };

    const handleArrow = () => {
      if(corrige){
        setOpenProd(!openProd);
      } else {
        if(props.type === "tyxal_min"){
          setOpenProd(!openProd);
          afficherProduits(props.cat.id);
          console.log(props.cat.id);
        } else {
          setOpenCat(!openCat);
          if(openProd){
            setOpenProd(false);
          }
        } 
      } 
    }

    const afficherProduits = (id) => {
      let prod = [];
      if(props.type === "tyxal" || props.type === "tyxal_min"){
        prod = props.produits.filter(produit => produit.categorie_tyxal.includes(id));
      } else {
        prod = props.produits.filter(produit => produit.categories.includes(id));
      }
      setOpenCat(false);
      setProdByCat(prod);
      setOpenProd(!openProd);
    }

    const calculerTotal = () => {
      let prix = 0;
      if (corrige){
        prix = prodByCat.map(el => parseInt(el.acf.prix, 10));
      } else {
        prix = dragArr.map(el => parseInt(el.prix, 10));
      }
      let filtered = prix.filter(el => !isNaN(el));
      let total = filtered.reduce(function(a, b){
        return a+b;
      }, 0);
      return total;
    }

    const deleteAll = () => {
      setPopup(false);
      setDragArr([]);
      setRotate([]);
    }

    const renderPopup = () => {
      switch(popup){
        case "retour":
          return <Popup message="Attention ! Votre progression sera perdue. Partir quand même ?" 
          position="top" yesAction={props.retour} noAction={() => setPopup(false)} />;
        case "delete":
          return  <Popup message="Tout supprimer ?" yesAction={deleteAll} noAction={() => setPopup(false)} />;
        case "corrige":
          return  <Popup position="top" message="Vous êtes prêts à passer à la correction ?" yesAction={corrigeEDC} noAction={() => setPopup(false)} />
        default:
          break;
      }
    }

    const corrigeEDC = () => {
      let prod = props.produits.filter(produit => props.data.produits.includes(produit.id));
      setProdByCat(prod);
      setCorrige(true);
      deleteAll();
      setPopup(false);
    }

    const toutFermer = () => {
      setOpenCat(false);
      setOpenProd(false);
    }

    console.log(props.produits);
    console.log(props.cat);
    console.log(props.data);
    return (
      <div className="etude_de_cas fullwidth">
        <img src={Arrow} alt='retour' className="retour" onClick={() => setPopup("retour")} />
        {popup && renderPopup()}
        <img className="plan" src={corrige ? props.data.corrige : props.data.plan} alt="plan" onClick={toutFermer} />
        
        {dragArr.map((el,i) => renderDrag(el,i))}
        
        <div className="edc buttons" >
            {!corrige &&
              <div onClick={() => setPopup("corrige")} >
                <img className="icon" src={Check} alt=""/>
              </div>
            }
            <div onClick={() => setOpen(true)} >
              <img className="icon" src={List} alt=""/>
            </div>
            {!corrige &&
            <div className={bin ? "scale" : undefined} ref={poubelle} onClick={() => setPopup("delete")} >
                <img className="icon bin" src={Delete} alt="" />
            </div>
            }
          <p className="total"><strong>Total : {calculerTotal()}&nbsp;€</strong></p>
          {corrige &&
            <button className="button_primary bottom_right" onClick={props.terminer}>Terminer</button>
          }
        </div>
        {props.loaded ?
          <div className="open-produits" onClick={handleArrow} >
            <img src={Arrow} className={openCat || openProd ? "arrow_down" : "black_to_grey"} alt=""/>
          </div>
          :
          <div className="open-produits">Chargement des produits...</div>
        }
        
        {/* ================Liste de categories ==================================*/}
        {props.cat &&
          <div ref={prodParent} className={openCat ? "drawer bottom open" : "drawer bottom"}>
          <Draggable axis="x" bounds={{left: -length2, top: 0, right: 0, bottom: 0}}>
          <ul className="list-produits" >
            {props.cat.length > 0 &&
            props.cat.map(el => (
              <li key={el.id} onClick={() => afficherProduits(el.id)}>
                  <img className="list-produits-image" src={el.acf.icone} alt=""/>
                  <h3>{el.name}</h3>
              </li>
            ))}

          </ul>
          </Draggable>
        </div>
        }
        
        {/* ================Liste de produits ==================================*/}
        <div className={openProd ? "drawer bottom open" : "drawer bottom"}>
          {prodByCat.length > 0 && openProd ?
          <Draggable defaultPosition={{x:0, y:0}} axis="x" bounds={{left: length3 > 0 ? -length3 : 0, top: 0, right: 0, bottom: 0}}>
          <ul ref={produits} className="list-produits" >
            {prodByCat.map(el => (
              <li key={el.id} >
                  <img className="list-produits-image" src={el.acf.image} alt={el.acf.titre} 
                  onClick={corrige ? null : () => handleClick(el.acf)}/>
                  <h3>{el.acf.titre.toUpperCase()}</h3>
                  <p>{upperCaseFirstLetter(el.acf.fonction)}</p>
                  <strong>{el.acf.prix} €</strong>
                  <div className="button_primary button_info-produit" onClick={() => setInfo(el)}>Info</div>
              </li>
            ))}
          </ul>
          </Draggable>
          : 
          <h3 className="oops">Il n'y a pas de produits dans cette catégorie...</h3>
          }
        </div>
        
        {/* =============Recapitulatif liste ================= */}

        <div className={open ? "backdrop open" : "backdrop"} onClick={() => setOpen(false)}></div>
        <div className={open ? "drawer right open" : "drawer right"}>
            <h2>Recapitulatif</h2>
              {props.data.recap && props.data.recap.split("<br />").map((el,i) => (
                <p className="recap_checkbox" key={i}>
                  <input type="checkbox" id={"check"+i} />
                  <label htmlFor={"check"+i}>{el}</label>
                </p>
              ))}
            
        </div>
        {/* =============Fiche popup info produit ================= */}
        {info && 
        <div>
          <div className="backdrop open" onClick={() => setInfo(null)}></div>
          <div className="info-produit">
            <img className="list-produits-image" src={info.acf.image} alt="" />
            <h3>{info.acf.titre.toUpperCase()}</h3>
            <p>{upperCaseFirstLetter(info.acf.fonction)}</p>
            <img className="icone close" src={Close} alt="" onClick={() => setInfo(false)} />
            <ul>
              {info.acf.description.split("<br />").map(el =>
              <li><p>{el}</p></li>
              )}
            </ul>
          </div>
        </div>
        }
        
      </div>
    
    );
  }