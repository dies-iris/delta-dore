import React, { useState } from "react";
import "../styles/Radio.css";
import Arrow from '../assets/up.png';
import _ from 'lodash';

export default function SliderRadio (props){
    const datas = _.orderBy(props.data, ['slide'],['asc']);
    const limit = Object.keys(datas).length-1;
    const [slide,setSlide] = useState(0);
    let slides=[];
    
    function changeSlide (i, limit) {
        let newSlide=slide+i;
        if(newSlide < 0){            
            setSlide(limit)
        } else if (newSlide > limit){
            setSlide(0);
        } else {
            setSlide(newSlide);
        }
    } 
   
    function renderSlides(){
        for(let i=0;i<datas.length;i++){
            switch(datas[i].modele_slide){
                // image>texte
                case '1':
                    slides.push('<div class="slide_radio slide_radio_img_text"><h2 class="souligne jaune">'+datas[i].titre+'</h2><img src="'+datas[i].image+'"/><p>'+datas[i].texte+'</p></div>');
                    break;
                // texte>image
                case '2':
                    slides.push('<div class="slide_radio slide_radio_img_text"><h2 class="souligne jaune">'+datas[i].titre+'</h2><p>'+datas[i].texte+'</p><img src="'+datas[i].image+'"/></div>');
                    break;
                // image
                case '3':
                    slides.push('<div class="slide_radio slide_radio_img"><h2 class="souligne jaune">'+datas[i].titre+'</h2><img src="'+datas[i].image+'"/></div>');
                    break;
                // texte
                case '4':
                    slides.push('<div class="slide_radio slide_radio_text"><h2 class="souligne jaune">'+datas[i].titre+'</h2><p>'+datas[i].texte+'</p></div>');
                    break;
            }           
        };
     }
     renderSlides();

    return(
        <div className="fullwidth">

            {
            slide > 0 &&
            <img src={Arrow} className="arrow_left arrow_left_radio" onClick={() => changeSlide(-1, limit)}alt=""/>
            }             
            <div id="slider_transmissions" dangerouslySetInnerHTML={{ __html: slides[slide] }}></div>
            {
            slide < limit &&
            <img src={Arrow} className="arrow_right arrow_right_radio" onClick={() => changeSlide(1, limit)}alt=""/>
            }
            <ul className="progress-dot-bar">
            {slides.length>1 &&
            datas.map((el, i) => 
            <li key={i} className={i===slide ? "progress-dot-dark progress-dot-light":"progress-dot-light"} onClick={()=>setSlide(i)}></li>
            )}
            </ul>
            
        </div>
        
    )
}


