import React, { useState} from "react";
import Draggable from 'react-draggable';
import Arrow from "../../assets/up.png";
import FichePresentationProduit from './FichePresentationProduit';
import DragAndDrop from "../DragAndDrop";
import "../../styles/tyxal.css"


export default function PacksTyxal (props) {

  const [page,setPage] = useState('');
  const [produit, setProduit] = useState([]);

  const afficherFichePresentation = (id) => {
      setProduit(id)
      setPage('fichePresentationProduit');
  }


  let triPacks = props.produits.filter(el => el.categorie_tyxal.includes(props.catTyxal.id));
  let length = (((triPacks.length)*220)+(triPacks.length)*40) - window.innerWidth;
 
  return (

    <div className="fullwidth"> 
        <img src={Arrow} className="retour"  onClick={props.retour} alt=""/>
        {
            page === 'miseEnSituation' ?
            <div className="fullwidth hidden">
              <DragAndDrop type="tyxal_min" loaded={props.loaded} produits={props.produits} cat={props.catTyxal} data={props.edc.acf} retour={() => setPage('')} terminer={() => setPage('')}/>
            </div>
            : page === 'fichePresentationProduit' ?
              <div className="fullwidth" >
                <img src={Arrow} className="retour"  onClick={() => setPage('')} alt=""/>
              <FichePresentationProduit produit={produit}  produits={props.produits} fond={props.fond} retour={() => setPage('')}/>
                </div>

            :
            <div className="back_vert_clair_tyxal container-list-produits-tyxal">
              <div>
              <Draggable
                axis="x"
                bounds={{left:(triPacks.length >4)&& -length, top: 0, right: 0, bottom: 0}}
                >
                <ul className="list-produits-tyxal" >
                  {props.produits.filter(el => el.categorie_tyxal.includes(props.catTyxal.id)).map(el => (
                    <li  key={el.id} onClick={()=>afficherFichePresentation(el.id)} >
                      <img className="list-produits-image-tyxal " src={el.acf.image} alt={el.acf.titre}></img>
                        <h3>{el.acf.titre}</h3>
                    </li> 
                  ))}
                </ul>
              </Draggable>
                </div>


              <div className="button_ss_menu_fonctionnalite"> 

              <div  className="boutonMenuEDC-tyxal" onClick={() => setPage('miseEnSituation')} >
              <h2>MISE EN SITUATION</h2>
              </div>
            </div>
          </div>   
        }
    </div>
  )
}



