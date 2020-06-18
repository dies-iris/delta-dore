import React, {useState} from 'react';
import Draggable from 'react-draggable';

import Arrow from '../assets/up.png';
import Bois from '../assets/exoPortee/bois.png';
import Air from '../assets/exoPortee/air.png';
import Platre from '../assets/exoPortee/platre.png';
import Metal from '../assets/exoPortee/metal.png';
import Verre from '../assets/exoPortee/verre-non-teinte.png';
import VerreT from '../assets/exoPortee/verre-teinte.png';
import Beton from '../assets/exoPortee/beton.png';
import Brique from '../assets/exoPortee/brique.png';

import '../styles/Lifedomus.css';

export default function ExoPortee(props){
    console.log(window.innerHeight)

    return(
        <div className="container_exo_portee">

            <h2>Consigne: positionner les matériaux sur l’échelle d’atténuation</h2>

            <div className="container_matiere">
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Bois} alt=""/>
                        <span>Bois</span> 
                    </div>
                    
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Air} alt=""/>
                        <span>Air</span> 
                    </div>
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Verre} alt=""/>
                        <span>Verre<br></br>non teinté</span> 
                    </div>
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Metal} alt=""/>
                        <span>Métal</span> 
                    </div>
                </Draggable>
            </div>
            <div className="container_matiere">
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Brique} alt=""/>
                        <span>Brique</span> 
                    </div>
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Platre} alt=""/>
                        <span>Plâtre</span> 
                    </div>
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={VerreT} alt=""/>
                        <span>Verre<br></br>teinté</span> 
                    </div>
                </Draggable>
                <Draggable bounds="body">
                    <div className="exo_matiere">
                        <img src={Beton} alt=""/>
                        <span>Dalle<br></br>béton</span> 
                    </div>
                </Draggable>
            </div>
            
            <div className="exo_graduation">
                <div className="exo_fleche"></div>
                <div className="exo_arrow_right"></div>
                <span>0%</span>
                <span>100%</span>
            </div>
        
        </div>
    )
}