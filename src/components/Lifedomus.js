import React, {useState, useEffect} from 'react';
import Query from "../tools/Query";
import SplashScreen from './SplashScreen';
import FichePresentationProduit from './Tyxal/FichePresentationProduit';
import Arrow from '../assets/up.png';
import FormationsLD from './FormationsLD';

export default function Lifedomus(props){
    const [splashscreen,setSplash]=useState(true);
    const [page,setPage] = useState('');
    const [formations, setFormations] = useState([]);
    const [tutoriels, setTutoriels] = useState([]);
    const [lifedomus, setLifedomus] = useState([]);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        new Query("formation_lifedomus").get()
        .then(response => response.json())
        .then(data => setFormations(data));  
    },[]);

    useEffect(() => {
        new Query("lifedomus_presa").get()
        .then(response => response.json())
        .then(data => setTutoriels(data));  
    },[]);
    
    useEffect(() => {
        new Query("lifedomus").get()
        .then(response => response.json())
        .then(data => setLifedomus(data));  
    },[]);
    
    console.log(lifedomus);
    return(
        <div className="fullwidth">
        <img src={Arrow} alt='retour' className="retour" onClick={props.retour} /> 
        {
            splashscreen &&
            <SplashScreen data={props.splashscreen} stop={() => setSplash(false)} />
        } 
        {page==="formations" ?
            <FormationsLD data={formations} tuto={tutoriels} retour={()=> setPage()} />
        :
        page === "lifedomus" ?
            <FichePresentationProduit produit={lifedomus} fond={props.splashscreen} retour={() => setPage('')} />
        :
            <div className="menu_presentation_dd">
                <div onClick={() => setPage('lifedomus')} className="carte_menu_presentation_dd " style={{backgroundImage : "url("+props.splashscreen.fond1+")", backgroundColor:"#d7eae3"}}  >
                <h2>PRÉSENTATION LIFEDOMUS</h2>
                </div>
                <div onClick={() => setPage('formations')} className="carte_menu_presentation_dd" style={{backgroundImage : "url("+props.splashscreen.fond2+")"}}>
                <h2>FORMATIONS</h2>
                </div>
            </div>
        }
        </div>
    )
}