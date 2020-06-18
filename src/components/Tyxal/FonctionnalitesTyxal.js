import React, { useState} from "react";
import Arrow from "../../assets/up.png";
import SsMenuFonctionnalite from "./SsMenuFonctionnalites";
import "../../styles/tyxal.css";



export default function FonctionnalitesTyxal (props) {

  const [page,setPage] = useState('');
  const [catTyxal, setCatTyxal] = useState();

   
  const afficherProduits = (cat) => {
      setCatTyxal(cat);
      setPage('menuFonctionnalite');            
  }


  return (
    <div className="fullwidth">
      <img src={Arrow} className="retour"  onClick={props.retour} alt=""/>
    {
       page === 'menuFonctionnalite' ?
       
          <SsMenuFonctionnalite prodByCat={props.produits.filter(el => el.categorie_tyxal.includes(catTyxal.id))} cat={catTyxal} catTyxal={props.catTyxal} edc={props.edc.find(el => el.categorie_tyxal.includes(catTyxal.id))} produits={props.produits} loaded={props.loaded} fond={props.fond} retour={() => setPage('')} /> 
 
       : 
       
       <div id="menu_fonctionnalite_tyxal"style={{backgroundImage : "url("+props.fond.fond5+")"}}>
          {props.catTyxal.length > 0 && 
           props.catTyxal.filter(el => el.id > 25 && el.id < 30).map(el => (
            <div className="carte_menu_tyxal" key={el.id} onClick={()=>afficherProduits(el)}>
                <img src={el.acf.icone} alt="icone"/>
                <h2>{el.name}</h2>
            </div>
            ))
          }
        </div>
    }
    </div>

  )
}