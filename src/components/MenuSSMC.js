import React,{useState,useEffect} from 'react';
import ReactPlayer from "react-player";
import Query from "../tools/Query";
import Arrow from '../assets/up.png';
import Play from '../assets/play-button.png';
import Schema from '../assets/diagrams.png';



export default function MenuSSMC (props) {
    
  const [cas, setCas]=useState(0);
  const [popup, setPopup]=useState(false);
  const [slide, setSlide]=useState(0);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    new Query("produits", props.cat.id).get()
      .then(response => response.json())
      .then(data => setProduits(data));  
  },[]);
  
  const renderPopup = (content) => {
    switch (content[1]) {
      case "video":
        return <ReactPlayer url={content[0]} 
              width="100%" height="100%" controls allowFullScreen
              // pip="false" 
              config={{
                youtube: {
                  playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0 },
                  // embedOptions: 
                }
              }}
              />;
      case "produits":
        let prod = props.bloc[cas].acf.produits.map(el => {
            let produit = produits.find(prod => prod.id === el);
            return produit;
          });
          console.log(prod);
        return (
          <div >
            {
              slide > 0 &&
              <img src={Arrow} className="arrow_left" onClick={() => setSlide(slide-1)} alt="" />
            }
            <div className="info-produit" >
              <img className="list-produits-image" src={prod[slide].acf.image} alt="" />
              <h3>{prod[slide].acf.titre}</h3>
              <p>{prod[slide].acf.fonction}</p>
              <ul>
                {prod[slide].acf.description.split("<br />").map(el =>
                <li><p>{el}</p></li>
                )}
              </ul>
            </div>
            {
              slide < prod.length-1 &&
              <img src={Arrow} className="arrow_right" onClick={() => setSlide(slide+1)} alt=""/>
            }
            {
              prod.length > 1 &&
              <ul className="progress-dot-bar" >
                {prod.map((prod,i) => {
                console.log(slide, i);
                return <li className={slide===i ? "progress-dot-dark progress-dot-light" : "progress-dot-light"} ></li>
                })}
              </ul>
            }
          </div> 
          )
      default:
        return <img src={content[0]} alt="" className="popup_image_fs fullwidth" />
    }
  }

return(
  <div className="fullwidth">
    <img src={Arrow} alt='retour' className="retour" onClick={popup ? () => {setPopup(false); setSlide(0)} : props.retour} />
    {props.bloc ?
      <div className='fullwidth flex'> 
        <div  className="bloc_menu">
          {props.bloc.map((el,i) => (
          <div key={i} className={cas===i ? "selected" : null} onClick={() => setCas(i)}>
            <h3>N°{i+1}</h3>
            <p>{el.acf.titre}</p>
          </div>
          ))} 
        </div>
        <div className="bloc_gauche">
          <div className="presentationSSMC">
            <h2 className="souligne jaune">{props.bloc[cas].acf.titre} </h2>
            <div className="flex" >
              <p>{props.bloc[cas].acf.description}</p>
              <img className="animation_MC" src={props.bloc[cas].acf.animation} alt="" />
            </div>
          </div>
          <div className="containerMediasSSMC" style={{backgroundImage: "url("+props.fond+")"}}>
            {(props.bloc[cas].acf.video || props.bloc[cas].acf.video_local) && 
              <div className="mc_video_bloc" 
              onClick={() => setPopup([props.bloc[cas].acf.video ? props.bloc[cas].acf.video : props.bloc[cas].acf.video_local, "video"])}>
                <h3>Vidéo</h3>
                <img src={Play} className="to_white" alt="" />
              </div>
            }
            {props.bloc[cas].acf.produits.length > 0 && produits &&
              <div className="mc_produits_bloc" onClick={produits.length > 0 ? () => setPopup([props.bloc[cas].acf.produits, "produits"]) : null} >
                <h3>Produits&nbsp;associés</h3>
                {produits.length > 0 &&
                  <img src={props.bloc[cas] && produits.length>0 ? produits.find(el => el.id === props.bloc[cas].acf.produits[0]).acf.image : null} alt="" />
                }
            </div>
            }
            {props.bloc[cas].acf.schema &&
              <div className={(popup && popup[1]==="schema") ? "popup_fullscreen" : "media"}
              onClick={() => setPopup([props.bloc[cas].acf.schema, "schema"])}>
                <h3>Schema</h3>
                <img src={Schema} className="to_white" alt="" />
              </div>
            }
              
          </div>
        </div>
      </div>
      :
      <div>Chargement...</div>
      }
      {popup &&
        <div className="popup_fullscreen">
          {renderPopup(popup)}
        </div>
      }
      </div>
  )  
}
  

 


