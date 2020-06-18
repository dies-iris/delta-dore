import React, {useState} from 'react';
import Arrow from "../../assets/up.png";
import Draggable from 'react-draggable';
import DragAndDrop from "../DragAndDrop";
import FichePresentationProduit from './FichePresentationProduit';
import "../../styles/tyxal.css"



export default function SsMenuFonctionnalite (props) {

  const [page,setPage] = useState(props.cat.id === 28 ? 'detecter' : '');
  const [produit, setProduit] = useState([]);
  const [prodByCat, setProdByCat] = useState(props.prodByCat);
  const [catTyxal, setCatTyxal] = useState(props.cat);

console.log(prodByCat)

  const triProduit=(id)=>{
    setProduit(id);
    afficherFichePresentation (id);
  }
 

  const afficherFichePresentation = (id) => { 
    setPage('fichePresentationProduit');
  }

  const afficherProduits = (cat) => {
    let prod = props.produits.filter(produit => produit.categorie_tyxal.includes(cat.id));
    setPage('');
    setProdByCat(prod);
    setCatTyxal(cat);
}


  let length = prodByCat.length*(220+20) - window.innerWidth * 0.8;


  console.log(length);
  return (
      <div className="fullwidth"> 
        <img src={Arrow} className="retour"  onClick={props.retour} alt=""/>
      {page === '' && props.cat.id === 28 &&
        <img src={Arrow} className="retour"  onClick={() => setPage('detecter')} alt=""/>
      } 
        {
          page === 'miseEnSituation' ?
          <div className="fullwidth hidden">
          <DragAndDrop type="tyxal_min" loaded={props.loaded} produits={props.produits} cat={catTyxal} data={props.edc.acf} retour={() => setPage('')} terminer={() => setPage('')}/>
          </div>

          :page === 'fichePresentationProduit' ?
          <div className="fullwidth"> 
          <img src={Arrow} className="retour"  onClick={() => setPage('')} alt=""/>
            <FichePresentationProduit produit={produit}  produits={props.produits} fond={props.fond} retour={() => setPage('')} />
          </div>
         : page === "detecter" ?
         <div id="menu_fonctionnalite_tyxal_detecter">
            {props.catTyxal.length > 0 && 
             props.catTyxal.filter((el)=>el.id===44 ||el.id===45 ||el.id===46).map(el => (
              <div className="carte_menu_tyxal" key={el.id} onClick={()=>afficherProduits(el)}>
                  <img src={el.acf.icone} alt=""/>
                  <h2>{el.name}</h2>
              </div>
              ))
            }
          </div>
               
          : 

          <div className={(prodByCat.length ===1)? "backCenter" : (prodByCat.length ===3)?  "backCenterTwo": "back_vert_clair_tyxal"}> 
        
                  <div className="container-list-produits-tyxal">
                    <Draggable
                    axis="x"
                    bounds={{left: length > 0 ? -length : 0, top: 0, right: 0, bottom: 0}}
                    >
                     
                      <ul className="list-produits-tyxal" >
                        {
                          prodByCat.map(el => (
                          <li  key={el.id} onClick={()=>triProduit(el.id)} >
                          <img className="list-produits-image-tyxal " src={el.acf.image} alt={el.acf.titre}></img>
                          <h3>{el.acf.titre}</h3>
                          </li> 
                        ))}
                      </ul>
                    </Draggable>
                  </div>

                  <div className="button_ss_menu_fonctionnalite">
                    <div className="boutonMenuEDC-tyxal"onClick={()=> setPage('miseEnSituation')}>
                      <h2>MISE EN SITUATION</h2>
                    </div>
                  </div>
              </div>   
        }
      </div>
      );
  };
