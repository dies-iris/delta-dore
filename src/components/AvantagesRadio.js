import React from 'react';
import "../styles/Radio.css";

export default function AvantagesRadio (props){
    const datas = props.data;

    function renderAvantages(){
        return Object.keys(datas).map(key => {
            if(datas[key] != "avantages"){
                return (
                    <div key={key} className="avantage" dangerouslySetInnerHTML={{ __html: datas[key] }}></div>
                ); 
            }
        });
     }

    return(
        renderAvantages()
    )
}