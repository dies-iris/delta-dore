import React, {useState} from 'react';
import Logo from '../assets/logo-header.png';
import { AUTH_TOKEN} from '../tools/helper';


export default function Menu (props) {
    const [openMenu, setOpenMenu] = useState(false);

    const handleClick = (ecran) => {
        props.setEcran(ecran);
        setOpenMenu(false);
    }

    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        setOpenMenu(false);
        props.setEcran('login');
    }

    return (
        <div className="menu">
            <div className="barre_haut">
                <img src={Logo} onClick={props.login ? null : () =>setOpenMenu(true)} alt=""/>
            </div>
            <div className={openMenu ? "backdrop open" : "backdrop"} onClick={() => setOpenMenu(false)}></div>
            <div className={openMenu ? "drawer left open" : "drawer left"}>
                <img src={Logo} className="logo" onClick={() => setOpenMenu(false)} alt=""/>
                <ul>
                <li onClick={() => handleClick("accueil")} ><strong>ACCUEIL</strong></li>
                <li onClick={() => handleClick("presa")}><strong>PRESENTATION</strong></li>
                <li onClick={() => handleClick("mc")}><strong>MAISON CONNECTEE</strong></li>
                <li onClick={() => handleClick("tyxal")}><strong>TYXAL</strong></li>
                <li onClick={() => handleClick("lifedomus")}><strong>LIFEDOMUS</strong></li>
                <li onClick={() => handleClick("formation")}><strong>FORMATION</strong></li>
                <li onClick={logout} style={{color : "#fff"}} >SE DECONNECTER</li>
                </ul>  
            </div>
        </div>
    )
}