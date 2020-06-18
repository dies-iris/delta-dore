import React, {useEffect, useState} from 'react';
import EtudeDeCas from './EtudeDeCas';
import Arrow from '../assets/up.png';

import Query from '../tools/Query';


export default function MenuSSEDC (props) {
  const [datas, setDatas] = useState();
  const [cat, setCat] = useState();
  const [filter, setFilter] = useState();
  const [edc, setEdc] = useState();
  const [produits, setProduits] = useState([]);
  const [loaded, setLoaded] = useState(false);

  console.log(datas);

  useEffect(() => {
    new Query("etudeDeCas", props.ids).get()
    .then(response => response.json())
    .then(data => setDatas(data.reverse()));  
  },[]);

  useEffect(() => {
    new Query("types_bien").get()
    .then(response => response.json())
    .then(data => setCat(data));  
  }, []);

  useEffect(() => {
    new Query("produits").get()
      .then(response => response.json())
      .then(data => {
        setProduits(data);
        setLoaded(true);
      });  
  },[]);

  const handleClick = (id) => {
    if(filter===id){
      setFilter();
    } else {
      setFilter(id);
    }
  }
console.log(edc);
  return(     
    <div className="fullwidth flex_column">
      <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />
      {!edc ?
        <div className="fullwidth">
          <div className="edc filter" >
            {cat && cat.map((type, i) => 
              <div key={i} className="container_boutonEDC">
                <div className={filter===type.id ? "button selected":"button"} onClick={() => handleClick(type.id)} >           
                  <div className="svg" style={{backgroundImage: "url("+type.acf.icone+")"}}></div>
                </div>
                <h3>{type.name}</h3>
              </div>
            )}
          </div>
          <div className="menuEDC" style={{backgroundImage : "linear-gradient(#d7eae3,#d7eae3), url("+props.fond+")"}} >
             {datas && 
             datas.filter(bien => filter ? bien.type_bien.includes(filter) : bien).map((cas,i)=>
                <div key={i} className="boutonMenuEDC" onClick={()=>setEdc(cas.acf)}>
                  <h3>{cas.acf.type}</h3>
                </div>
              )}
          </div>
        </div>
        :
        <EtudeDeCas produits={produits} loaded={loaded} cat={props.cat} data={edc} retour={() => setEdc(false)} />
      }
    </div>
  ) 
}
  