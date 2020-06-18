import React, {useState} from 'react';

export default function Scenarios(props){
    const [option, setOption]=useState("tout");

    const handleClick = () => {
        props.setMenu(option); 
        props.setEcran();
    }

    return(
        <div className="choixscenario">
          <div>
            <h1 className="souligne jaune">Scénario de formation</h1>
              <p
                onClick={()=>setOption("mc")}
                className={option === "mc" ? ("checked"): ("notchecked") }
              >Maison Connectée</p>
            
              <p
                onClick={()=>setOption("tyxal")}
                className={option === "tyxal" ? ("checked"): ("notchecked") }
              >Tyxal</p>
            
              <p
                onClick={()=>setOption("lifedomus")}
                className={option === "lifedomus" ? ("checked"): ("notchecked") }
              >Lifedomus</p>
            
              <p
                onClick={()=>setOption("tout")}
                className={option === "tout" ? ("checked"): ("notchecked") }
              >Toute l'offre</p>
              
            <button onClick={handleClick}>Commencer</button>
          </div>
        </div>
    )
}