import React, {useState} from 'react';
import Draggable from 'react-draggable';
import Arrow from '../assets/up.png';
import PresaLD from './PresaLD';
import Tutoriels from './Tutoriels';

export default function FormationsLD(props){
    
    const [id,setID] = useState(false);
    const [tuto,setTuto] = useState(false);
    const length = props.data.length * (350+30)+50 - window.innerWidth;

    console.log(id);
    return(
        <div className="fullwidth hidden">
        <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
        {!tuto?
            !id ?
            <div>
                <Draggable axis="x" 
          bounds={{top: 0, left: length > 0 ? -length : 0, right: 0, bottom: 0}}>
                <ul className="lifedomus_formation_draggable" >
                {
                props.data.length>0 ? 
                props.data.map((formation,i) =>
                <li className="carte_menu_presentation_dd lifedomus" key={i}
                style={{backgroundImage : "url("+ formation.acf.image +")"}} 
                onClick={() => setID(formation.id)}>
                    <h2>{formation.name.toUpperCase()}</h2>
                </li>
                )
                : 
                <p>Chargement...</p>
                }
            </ul>
            </Draggable>
                <div className="boutonMenuEDC-tyxal lifedomus" onClick={() => setTuto(true)}>
                    <h2>TUTORIELS</h2>
                </div>
            </div>
            :
            <PresaLD cat={props.data}  tuto={props.tuto} id={id} retour={() => setID()} />
        
        :
        <Tutoriels tuto={props.tuto} retour={() => setTuto(false)}/>

        }

        </div>
    )
}