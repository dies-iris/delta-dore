import React, {useEffect, useState} from 'react';
import Query from '../../tools/Query';
import EtudeDeCas from '../EtudeDeCas';
import Arrow from '../../assets/up.png';



export default function MenuSSEDC (props) {
  const [produits, setProduits] = useState([]);
  const [loaded, isLoaded] = useState(false);
  const [catTyxal, setCatTyxal] = useState();
  const [typeBien, setTypeBien] = useState();
  const [filter, setFilter] = useState();
  const [edc, setEdc] = useState([]);
  const [selected, setSelect] = useState(false);



  useEffect(() => {
    new Query("categorie_tyxal").get()
    .then(response => response.json())
    .then(data => {
      setCatTyxal(data);
      getEDC(data.map(cat => cat.id)); 
      getProd(data.map(cat => cat.id));
    }) 
  }, []);

  useEffect(() => {
    new Query("types_bien").get()
    .then(response => response.json())
    .then(data => setTypeBien(data));  
  }, []);
  
  useEffect(() => {
    new Query("produits").get()
      .then(response => response.json())
      .then(data => setProduits(data));  
  }, []);
  
  const getEDC = (cat) => {
    new Query("edcTyxal", cat).get()
    .then(response => response.json())
    .then(data => setEdc(data));
  }
  const getProd = (cat) => {
    new Query("produitsTyxal", cat).get()
    .then(response => response.json())
    .then(data => {
      setProduits(data);
      isLoaded(true);
    });
  }

  const handleClick = (id) => {
    if(filter===id){
      setFilter();
    } else {
      setFilter(id);
    }
  }


  return(     
    <div className="fullwidth flex_column">
      <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
      {!selected ?
        <div className="fullwidth">
          <div className="edc filter" >
            {typeBien && typeBien.map((type, i) => 
              <div key={i} className="container_boutonEDC  ">
                <div className={filter===type.id ? "button selected":"button"} onClick={() => handleClick(type.id)} >           
                  <div className="svg" style={{backgroundImage: "url("+type.acf.icone+")"}}></div>
                </div>
                <h3>{type.name}</h3>
              </div>
            )}
          </div>
          <div className="menuEDC menuEDCTyxal" style={{backgroundImage : "linear-gradient(#d7eae3,#d7eae3), url("+props.fond.fond4+")"}} >
             {edc && edc.length > 0 && loaded ? 
             edc.filter(bien => filter ? bien.type_bien.includes(filter) : bien).map((cas,i)=>
                <div key={i} className="boutonMenuEDC" onClick={()=>setSelect(cas.acf)}>
                  <h3>{cas.acf.type}</h3>
                </div>
              )
            :
            <p>Chargement...</p>
            }
          </div>
        </div>
        :
        <EtudeDeCas type="tyxal" loaded={loaded} produits={produits} cat={catTyxal.filter(el=>el.id !==52)} data={selected} retour={() => setSelect(false)} />
      }
    </div>
  ) 
}
  
