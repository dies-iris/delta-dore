import React, {useState, useEffect} from 'react';
import Arrow from '../assets/up.png';
import DragAndDrop from './DragAndDrop';



export default function EtudeDeCas(props){
    const datas = props.data;
    const [slide, setSlide] = useState(1);
    const [ecran, setEcran] = useState();
    const [limitation, setLimit] = useState(1); 

    useEffect(() => {
        let limit = 0;
        for (var key in datas) {
            if (/^slide/.test(key) && datas[key].length >0) {
                ++limit;
            }
        } 
        console.log(limit);
        setLimit(limit);
    },[])
    
    const changeSlide = (i) => {
        let newSlide=slide+i;
        if(newSlide < 1){
            setSlide(limitation)
        } else if (newSlide > limitation){
            setSlide(1);
        } else {
            setSlide(newSlide);
        }
    }

    const handleRetour = () => {
        if(datas.slide1.length > 0){
            setSlide(1);
            setEcran('slides');
        } else {
            props.retour();
        }
    }

    console.log(datas.slide1);
    return(
        <div className="fullwidth hidden">
            <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
            {datas && !ecran &&
            <div className="presentation-cas">
                <h1 className="souligne jaune" >{datas.titre}</h1>
                <img src={datas.image1} alt=""/>
                <button className="button_primary" onClick={()=>setEcran(datas.slide1 ? "slides" : "edc")}>Demarrer</button>
            </div>
            }
            {(ecran==="slides" && datas.slide1.length > 0) &&
            <div className="fullwidth slides">
                <img src={datas.image2} alt=""/>
                <div className="slider">
                    {datas["slide"+slide].split("<br />").map((phrase, i) => 
                    <p key={i}>{phrase}</p>
                    )}
                    {
                        slide > 1 &&
                        <img src={Arrow} className="arrow_left" onClick={() => changeSlide(-1)} alt="" />
                    }
                    {
                        slide < limitation ?
                    <img src={Arrow} className="arrow_right" onClick={() => changeSlide(1)} alt=""/>
                    :
                    <button className="button_primary" onClick={()=>setEcran("edc")}>Commencer</button>

                    }
                </div>
                <div className="progress-bar-light">
                    <div className="progress-bar-darker" style={{width: slide/limitation*100+"%"}}></div>
                </div>
            </div>
            }
            {ecran==="edc" &&
                <DragAndDrop type={props.type} loaded={props.loaded} produits={props.produits} cat={props.cat} data={props.data} retour={handleRetour} terminer={props.retour}/>
            }
        </div>
    )
}