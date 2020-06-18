import React, {  useState, useEffect } from 'react';
import Query from '../tools/Query';
import '../styles/Histoire.css';
import Chemin from '../assets/chemin.png';
import _ from 'lodash';
import Arrow from '../assets/up.png';




export default function Histoire () {

    const [data, setData] = useState([]);
    const [detail, setDetail] = useState();
    const [page, setPage] = useState('');
    const [marge, setMarge] = useState('');
    const [margeBot, setMargeBot] = useState('auto');
    const [align, setAlign] = useState('');

    useEffect(() => {
      new Query("histoire").get()
        .then(response => response.json())
        .then(data => setData(data));  
    },[]);

    function seeDetail(el){
      setDetail(el);
      setPage('detail');
    };

    function seeDetailPopUp(el,i){
      setDetail(el);
      setPage('detail_popup');
      if(i === 0){
        let margeTop = (i+1) * 5+"vh";  
        setMarge(margeTop);
        setMargeBot('auto');
      } else if(data2.length === (i+1)){
        setMarge('auto');
        setMargeBot('2%');
      }else {        
        let margeTop = (i) * 20.7+"vh";  
        setMarge(margeTop);
        setMargeBot('auto');
      }
      if(i%2 === 0){
        setAlign('auto');
      } else {
        setAlign('0');
      }
    };

    let data2 =  _.orderBy(data, ['acf.annee'],['asc']);
    let imgHeight = window.innerHeight - 60;

    return (
      <div className="container_histoire">

      
      {page === 'detail' ? 
      (
        <div className="histoire_detail">
          <img src={Arrow} className="retour_chrono"  onClick={() => setPage('')} alt="retour"/>
          <div className="histoire_detail_img" style={{backgroundImage:`url(${detail.acf.image})`, height:imgHeight+'px'}}></div>
          <div>
            <div className="histoire_detail_texte">
              <h2>{detail.acf.annee}</h2>
              <h1 className="souligne jaune">{detail.acf.titre}</h1>              
              <p>{detail.acf.description}</p>
            </div>
          </div>
        </div>
      )
      
      :
    
      data2.map((el,i) => (  
        <div className="histoire_card" key={i} style={{backgroundImage:`url(${el.acf.image})`}}>
          <img onClick={() => seeDetailPopUp(el,i)} className="img_chemin" src={Chemin} alt=""/>
          <div onClick={() => seeDetail(el)}>
            <div>
              <span className="histoire_card_date">{el.acf.annee}</span>
              <h3>{el.acf.titre}</h3>
            </div>
          </div>
        </div>
        
      ))      
      }
      
      {page === 'detail_popup' ?
      (
        <div onClick={()=>setPage('')} className="detail_popup" style={{top: marge, right: align, bottom: margeBot}}>
          <div>
            <div className="bloc_vert_popup"></div>
            <h2>{detail.acf.annee}</h2>
            <h1 className="souligne jaune">{detail.acf.titre}</h1>
            <p>{detail.acf.description}</p>
          </div>
        </div>
      )
      :
      <span></span>
      }



      </div>

    )

}