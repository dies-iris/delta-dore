import React, {useState, useEffect} from 'react';
import ReactPlayer from "react-player";
import SplashScreen from './SplashScreen';
import Query from '../tools/Query';
import Arrow from '../assets/up.png';
import Search from '../assets/search.png';
import Draggable from 'react-draggable';
import upperCaseFirstLetter from "../tools/functions";
import Close from '../assets/close.png';

import "../styles/Formations.css";

export default function Formations(props){
    const [splashscreen,setSplash]=useState(true);
    const [cat, setCat] = useState([]);
    const [formations, setFormations] = useState([]);
    const [selection, setSelection] = useState([]);
    const [filtre, setFiltre] = useState();
    const [popup, setPopup] = useState(false);
    let length1 = formations && formations.length*(200+40)+100 - window.innerWidth;
    let length2 = selection && selection.length*(200+40)+100 - window.innerWidth;
    let length = selection.length > 0 ? length2 : length1;
    console.log(length);

    useEffect(() => {
        new Query("type_formation").get()
          .then(response => response.json())
          .then(data => setCat(data));  
      },[]);
    
    useEffect(() => {
        new Query("formations").get()
          .then(response => response.json())
          .then(data => {
            setFormations(data);
            setSelection(data);
        });  
      },[]);

    const filterFormations = (tag) => {
        if(tag === filtre) {
            setFiltre(false);
            setSelection(formations);
        } else {
            setFiltre(tag);
            setSelection(formations.filter(form => form.type_formation.includes(tag)));
        }
    }

    const search = (text) => {
        setFiltre();
        let search = text.trim().toLowerCase().split(' ');
        let data = [];
        for(let i=0; i < formations.length; i++){
            if(search.every(el => formations[i].acf.titre.toString().toLowerCase().includes(el))){
            data.push(formations[i]);
            }
        }
        setSelection(data);   
    }

console.log(popup);
console.log(formations);
    return(
        <div className="fullwidth back_vert formations">
            <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
            {
                splashscreen &&
                <SplashScreen data={props.splashscreen} stop={() => setSplash(false)} />
            }  
            <h1 className="souligne jaune" >Formations</h1>
            {(props.splashscreen.video || props.splashscreen.video2) &&
                <ReactPlayer className="video_formations" url={props.splashscreen.video ? props.splashscreen.video : props.splashscreen.video2} 
            width="80%" height="70%" controls allowFullScreen
            // pip="false" 
            config={{
                youtube: {
                playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0 },
                // embedOptions: 
                }
            }}
            />
        }
            <div className="white_back">
                <img src={Arrow} className="icone arrow_down" alt="arrow-down"/>
            </div>
            <h1 className="souligne jaune" >Catalogue</h1>
            <div>
                <span className="search" ><img src={Search} className="icone to_white" alt="search" /></span> 
                <input type="search" onChange={(e) => search(e.target.value)} />
            </div>
            <ul className="filtres" >
                {cat.length > 0 &&
                cat.map( (tag, i) => 
                    <li key={i} onClick={() => filterFormations(tag.id)} className={filtre === tag.id ? "filtre active" : "filtre"} >
                        {tag.name}
                    </li>
                )}
            </ul>
            <Draggable axis="x" bounds={{left: length > 0 ? -length : 0, top: 0, right: 0, bottom: 0}}>
                <ul className="list_formations" >
                    {selection.length > 0 ?
                    selection.map( (form, i) => 
                        <li key={i} className="formations" onClick={() => setPopup(form)} >
                            <h3>{upperCaseFirstLetter(form.acf.titre)}</h3>
                        </li>
                    )
                    :
                    <p className="center_margins">Aucune formation correspond à votre recherche...</p>
                    }
                </ul>
            </Draggable>
            {popup &&
                <div className="formations_popup">
                    <img src={Close} className="icone close_popup" alt="" onClick={() => setPopup(false)} />
                    <h2 className="souligne jaune" >{popup.acf.titre}</h2>
                    <div className='flex' >
                        <div>
                            {popup.acf.programme &&
                            <div>
                                <h3 className="souligne vert" >Programme</h3>
                                <ul>
                                    {popup.acf.programme.split('<br />').map((item,i) =>
                                        <li className="list_style" key={i}>
                                            {upperCaseFirstLetter(item)}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            }
                        </div>
                        <div>
                            {popup.acf.duree &&
                            <div>
                                <h3 className="souligne vert">Durée</h3>
                                <h2>{popup.acf.duree} </h2>
                            </div>
                            }
                            {popup.acf.cout &&
                            <div>
                                <h3 className="souligne vert">Coût</h3>
                                <p>à partir de</p>
                                <h2>{popup.acf.cout} €</h2>
                                </div>
                            }
                        </div>
                        {popup.acf.max &&
                            <div>
                                <h3 className="souligne vert" >Participants</h3>
                                <h2>{popup.acf.max}</h2>
                                <p>participants maximum</p>
                            </div>
                        }
                    </div>
                    {popup.acf.image &&
                        <img src={popup.acf.image} alt="" className="image_absolute" />
                    }
                    {popup.acf.url &&
                        <a href={popup.acf.url} target="_blanc" className="voir_plus">Aller sur le site</a>
                    }
                </div>
            }
        </div>
    )
}