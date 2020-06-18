import React, {useState} from 'react';
import Arrow from '../assets/up.png';
import Phone from '../assets/exoReseau/1_1.png';
import A from '../assets/exoReseau/A.png';
import A2 from '../assets/exoReseau/A-2.png';
import B from '../assets/exoReseau/B.png';
import B2 from '../assets/exoReseau/B-2.png';
import C from '../assets/exoReseau/C.png';
import C2 from '../assets/exoReseau/C-2.png';
import D from '../assets/exoReseau/D.png';
import D2 from '../assets/exoReseau/D-2.png';
import E from '../assets/exoReseau/E.png';
import E2 from '../assets/exoReseau/E-2.png';
import FGH from '../assets/exoReseau/FGH.png';
import I from '../assets/exoReseau/I.png';
import I2 from '../assets/exoReseau/I-2.png';
import J from '../assets/exoReseau/J.png';
import J2 from '../assets/exoReseau/J-2.png';
import K from '../assets/exoReseau/K.png';
import K2 from '../assets/exoReseau/K-2.png';
import Trait from '../assets/exoReseau/trait.png';
import Trait2 from '../assets/exoReseau/trait-2.png';

import '../styles/Lifedomus.css';

export default function ExoReseau(props){

    const [a,setA] = useState(true);
    const [b,setB] = useState(true);
    const [c,setC] = useState(true);
    const [d,setD] = useState(true);
    const [e,setE] = useState(true);
    const [i,setI] = useState(true);
    const [j,setJ] = useState(true);
    const [k,setK] = useState(true);
    const [trait,setTrait] = useState(true);

    return(
        <div className="container_exo">
            <img className="phone" src={Phone} alt=""/>
            <img onClick={() => setA(false)} className="A" src={a ?A : A2} alt=""/>
            <img onClick={() => setB(false)} className="B" src={b ?B : B2} alt=""/>
            <img onClick={() => setC(false)} className="C" src={c ?C : C2} alt=""/>
            <img onClick={() => setD(false)} className="D" src={d ?D : D2} alt=""/>
            <img onClick={() => setE(false)} className="E" src={e ?E : E2} alt=""/>
            <img className="FGH" src={FGH} alt=""/>
            <img onClick={() => setI(false)} className="I" src={i ?I : I2} alt=""/>
            <img onClick={() => setJ(false)} className="J" src={j ?J : J2} alt=""/>
            <img onClick={() => setK(false)} className="K" src={k ?K : K2} alt=""/>            
            <img onClick={() => setTrait(false)} className="trait" src={trait ?Trait : Trait2} alt=""/>            
        </div>
    )
}