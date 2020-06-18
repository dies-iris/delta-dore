import React from 'react';
import Draggable from 'react-draggable';
import '../styles/MenuPrincipal.css';

export default function MenuPrincipal(props) {

    let screenWidth = window.innerWidth;
    let multipl = props.menu==="tout" ? 5 : 3;
    let length = ((multipl*355)+(multipl*70)) - screenWidth;
    
    return(
      <div className="fullwidth hidden">
          <Draggable axis="x" 
          bounds={{top: 0, left: -length, right: 0, bottom: 0}}>
            <div id="menu_principal"> 
              <div className="menu_card" 
              style={{backgroundImage:'url('+props.data.find(sp => sp.id==="1").splashscreen+')'}}
              onClick={() => props.setEcran("presa")}>
                <div>
                  <p>{props.data.find(sp => sp.id==="1").titre} </p>
                </div>
              </div>

              {(props.menu === "mc" || props.menu ==="tout") &&
              <div className="menu_card" 
              style={{backgroundImage:'url('+props.data.find(sp => sp.id==="2").splashscreen+')'}}
              onClick={() => props.setEcran("mc")}>
                <div>
                  <p>{props.data.find(sp => sp.id==="2").titre}</p>
                </div>
              </div>
              }

              {(props.menu === "tyxal" || props.menu ==="tout") &&
              <div className="menu_card" 
              style={{backgroundImage:'url('+props.data.find(sp => sp.id==="3").splashscreen+')'}}
              onClick={() => props.setEcran("tyxal")}>
                <div>
                  <p>{props.data.find(sp => sp.id==="3").titre}</p>
                </div>
              </div>
              }
              {(props.menu === "lifedomus" || props.menu ==="tout") &&
              <div className="menu_card" 
              style={{backgroundImage:'url('+props.data.find(sp => sp.id==="4").splashscreen+')'}}
              onClick={() => props.setEcran("lifedomus")}>
                <div>
                  <p>{props.data.find(sp => sp.id==="4").titre}</p>
                </div>
              </div>
              }
              <div className="menu_card" 
              style={{backgroundImage:'url('+props.data.find(sp => sp.id==="5").splashscreen+')'}}
              onClick={() => props.setEcran("formation")}>
                <div>
                  <p>{props.data.find(sp => sp.id==="5").titre}</p>
                </div>
              </div>
            </div>
          </Draggable>
        </div>
    );
}