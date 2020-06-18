import React from 'react';
import Yes from '../assets/tick.png';
import No from '../assets/close.png';

import '../styles/popup.css';

export default function Popup(props){
console.log('POPUP')
    return(
        <div className={props.position ? props.position + " popup" : "popup"}>
            <h3>{props.message}</h3>
            <img src={Yes} onClick={props.yesAction} className="icone yes" alt="" />
            <img src={No} onClick={props.noAction} className="icone no" alt="" />
        </div>
    )
}