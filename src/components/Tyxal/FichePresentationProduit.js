import React, {useState} from 'react';
import Draggable from 'react-draggable';
import ReactPlayer from "react-player";
import Arrow from "../../assets/up.png";
import "../../styles/tyxal.css";


export default function FichePresentationProduit (props) {

   const ficheId = props.produits ? props.produits.find(el=>el.id===props.produit) : props.produit;
   const [para,setPara] = useState('');
   const [popUp,setOpenPopUp] = useState(false);
   const [NumberPopUp,setNumberPopUp] = useState();


    function testExist (el){
    if(typeof(el) !== "undefined" && el!==false && el!== ""){
        return true;
    }    
    }


    function testValue(el){
        if(el.length === 0){
            return false;
        } else{
            return true;
        }
    }

    

    function affichePopUp(num){
        
        if(num===NumberPopUp){
            setNumberPopUp();
            setOpenPopUp(false);
        } else{
            setNumberPopUp(num);
            setOpenPopUp(true); 
        }
       
    }

    
    var sizeGalerieImg = Object.values(ficheId.acf.section_explication_image.galerie.images).filter(el=>el !==false).length;
    var sizeGalerieVideo = Object.values((ficheId.acf.section_videos)).filter(el=>el !=="" &&el!==false && el!=="Vidéo" &&el.video!==false).length;

console.log(sizeGalerieVideo)
    let length1= (sizeGalerieImg*600)- window.innerWidth+190;
    let length2= sizeGalerieVideo*800 - window.innerWidth+600;

    return (
        
        <div className="fullwidth" >
            <img src={Arrow} alt='retour' className="retour" onClick={props.retour} /> 
            {ficheId.acf?
                <div>
                    <div className="fullwidth fichePresentation" style={{backgroundColor:"lightgrey", overflow:"unset"}}>
                        
                
                            {/*===================================================================================================
                            =                                          section_header                                            
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_header) && testValue(Object.values(ficheId.acf.section_header)[0]) &&
                                <div className="sectionsTyxal header" id="backgroundHeader" style={{
                                    backgroundImage : "url("+props.fond.fond6+"),url("+props.fond.fond6+")"
                                   }}>

                                        <div>
                                            {testExist(ficheId.acf.section_header.titre)&&
                                            <h1> {ficheId.acf.section_header.titre}</h1>}
                                            {testExist(ficheId.acf.section_header.sous_titre)&&
                                            <h2>{ficheId.acf.section_header.sous_titre}</h2>}
                                        </div>

                                        {testExist(ficheId.acf.section_header.image) &&
                                        <img className="imgTyxal" src={Object.values(ficheId.acf.section_header)[2]} alt=""/>}

                                        {testExist(ficheId.acf.section_header.bloc1) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc1.titre)) &&
                                        <div className="section_blocs">
                                            <div>
                                            {testExist(ficheId.acf.section_header.bloc1.titre) &&
                                            <h2>{ficheId.acf.section_header.bloc1.titre}</h2>}
                                            {testExist(ficheId.acf.section_header.bloc1.icone)&&
                                            <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc1)[1]} alt=""/>}
                                            </div>
                                        {testExist(ficheId.acf.section_header.bloc2) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc2.titre)) &&
                                            <div>
                                            {testExist(ficheId.acf.section_header.bloc2.titre) && 
                                            <h2>{ficheId.acf.section_header.bloc2.titre}</h2>}
                                            {testExist(ficheId.acf.section_header.bloc2.icone)&&
                                            <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc2)[1]} alt=""/>}
                                            </div>}
                                       {testExist(ficheId.acf.section_header.bloc3) && 
                                       testValue(Object.values(ficheId.acf.section_header.bloc3.titre)) &&
                                             <div>
                                             {testExist(ficheId.acf.section_header.bloc3.titre) && 
                                             <h2>{ficheId.acf.section_header.bloc3.titre}</h2>}
                                             {testExist(ficheId.acf.section_header.bloc3.icone)&&
                                             <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc3)[1]} alt=""/>}
                                             </div>}
                                        {testExist(ficheId.acf.section_header.bloc4) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc4.titre)) &&
                                            <div>
                                             {testExist(ficheId.acf.section_header.bloc4.titre) && 
                                             <h2>{ficheId.acf.section_header.bloc4.titre}</h2>}
                                             {testExist(ficheId.acf.section_header.bloc4.icone)&&
                                             <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc4)[1]} alt=""/>}
                                             </div>}
                                        {testExist(ficheId.acf.section_header.bloc5) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc5.titre)) &&
                                            <div>
                                             {testExist(ficheId.acf.section_header.bloc5.titre) && 
                                             <h2>{ficheId.acf.section_header.bloc5.titre}</h2>}
                                             {testExist(ficheId.acf.section_header.bloc5.icone)&&
                                             <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc5)[1]} alt=""/>}
                                             </div>}
                                        {testExist(ficheId.acf.section_header.bloc6) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc6.titre)) &&
                                            <div>
                                             {testExist(ficheId.acf.section_header.bloc6.titre) && 
                                             <h2>{ficheId.acf.section_header.bloc6.titre}</h2>}
                                             {testExist(ficheId.acf.section_header.bloc6.icone)&&
                                             <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc6)[1]} alt=""/>}
                                             </div>}
                                        {testExist(ficheId.acf.section_header.bloc7) && 
                                        testValue(Object.values(ficheId.acf.section_header.bloc7.titre)) &&
                                            <div>
                                             {testExist(ficheId.acf.section_header.bloc7.titre) && 
                                             <h2>{ficheId.acf.section_header.bloc7.titre}</h2>}
                                             {testExist(ficheId.acf.section_header.bloc7.icone)&&
                                             <img className="iconTyxal" src={Object.values(ficheId.acf.section_header.bloc7)[1]} alt=""/>}
                                            </div>}
                                        </div>}
                                </div> 
                            }



                            {/*===================================================================================================
                            =                                         section_fonctionnalites                                    
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_fonctionnalites) && testValue(Object.values(ficheId.acf.section_fonctionnalites)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white backgroundFonctionnalite testcolor fonctionnalite" >

                                        <div>
                                            <h1>
                                            {testExist(ficheId.acf.section_fonctionnalites.titre)&&
                                            <span> {ficheId.acf.section_fonctionnalites.titre}</span>}
                                            </h1>
                                        </div>
                                        
                                        <div className="containerImgTyxal fondFonctionnalite">
                                        {testExist(ficheId.acf.section_fonctionnalites.photo) &&
                                        <img className="imgTyxal imgTyxalMediumSize" src={Object.values(ficheId.acf.section_fonctionnalites)[1]} alt="" />}  
                                        </div>
                                        
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc1) && 
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc1.titre)) &&
                                           <div className="section_blocs centerTyxal">
                                           <div onClick={()=>setPara('parabloc1Fonct')}>
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc1.titre) &&
                                            <h2>{ficheId.acf.section_fonctionnalites.bloc1.titre}</h2>}
                                            </div>
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc2) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc2.titre)) &&
                                            <div onClick={()=>setPara('parabloc2Fonct')}>
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc2.titre) &&
                                            <h2>{ficheId.acf.section_fonctionnalites.bloc2.titre}</h2>}
                                            </div>}
                                       {testExist(ficheId.acf.section_fonctionnalites.bloc3) &&  
                                       testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc3.titre)) &&
                                              <div onClick={()=>setPara('parabloc3Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites.bloc3.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites.bloc3.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc4) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc4.titre)) &&
                                             <div onClick={()=>setPara('parabloc4Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites.bloc4.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites.bloc4.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc5) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc5.titre)) &&
                                             <div onClick={()=>setPara('parabloc5Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites.bloc5.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites.bloc5.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc6) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc6.titre)) &&
                                             <div onClick={()=>setPara('parabloc6Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites.bloc6.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites.bloc6.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites.bloc7) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc7.titre)) &&
                                             <div onClick={()=>setPara('parabloc7Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites.bloc7.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites.bloc7.titre}</h2>}
                                            </div>}
                                            </div>}
                                            


                                            {testExist(ficheId.acf.section_fonctionnalites.bloc1.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc1.paragraphe))&&
                                            <div className="container_paragraphes">
                                            {para ==='parabloc1Fonct'?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc1.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc1.paragraphe))&&
                                            <div id="parabloc1Fonct" >{(ficheId.acf.section_fonctionnalites.bloc1.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc2Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc2.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc2.paragraphe))&&
                                            <div id="parabloc2Fonct" >{(ficheId.acf.section_fonctionnalites.bloc2.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>
                                            
                                            :para === 'parabloc3Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc3.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc3.paragraphe))&&
                                            <div id="parabloc3Fonct" >{(ficheId.acf.section_fonctionnalites.bloc3.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc4Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc4.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc4.paragraphe))&&
                                            <div id="parabloc4Fonct" >{(ficheId.acf.section_fonctionnalites.bloc4.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc5Fonct' ?
                                            <div className="section_bloc_paragraphes"> 
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc5.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc5.paragraphe))&&
                                            <div id="parabloc5Fonct" >{(ficheId.acf.section_fonctionnalites.bloc5.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc6Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc6.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc6.paragraphe))&&
                                            <div id="parabloc6Fonct" >{(ficheId.acf.section_fonctionnalites.bloc6.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc7Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc7.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc7.paragraphe))&&
                                            <div id="parabloc7Fonct" >{(ficheId.acf.section_fonctionnalites.bloc7.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites.bloc1.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites.bloc1.paragraphe))&&
                                            <div id="parabloc1Fonct" >{(ficheId.acf.section_fonctionnalites.bloc1.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>
                                            }
                                            </div> }  
                                </div> 
                            }



                            {/*===================================================================================================
                            =                                        section_fonctionnalites_supplementaires                                  
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires) && 
                            testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires)[7]) &&
                                <div className="sectionsTyxal testcolor fonctionnaliteSuppl" > 

                                        <div>
                                        <h1>
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.titre)&&
                                            <span> {ficheId.acf.section_fonctionnalites_supplementaires.titre}</span>}
                                        </h1>
                                        </div>

                                       
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc1) && 
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.titre)) &&
                                           <div className="section_blocs centerTyxal">
                                           <div onClick={()=>setPara('parabloc1Fonct')}>
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.titre) &&
                                            <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc1.titre}</h2>}
                                            </div>
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc2) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc2.titre)) &&
                                            <div onClick={()=>setPara('parabloc2Fonct')}>
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc2.titre) &&
                                            <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc2.titre}</h2>}
                                            </div>}
                                       {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc3) &&  
                                       testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc3.titre)) &&
                                              <div onClick={()=>setPara('parabloc3Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc3.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc3.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc4) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc4.titre)) &&
                                             <div onClick={()=>setPara('parabloc4Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc4.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc4.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc5) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc5.titre)) &&
                                             <div onClick={()=>setPara('parabloc5Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc5.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc5.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc6) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc6.titre)) &&
                                             <div onClick={()=>setPara('parabloc6Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc6.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc6.titre}</h2>}
                                             </div>}
                                        {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc7) &&  
                                        testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc7.titre)) &&
                                             <div onClick={()=>setPara('parabloc7Fonct')}>
                                             {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc7.titre) &&
                                             <h2>{ficheId.acf.section_fonctionnalites_supplementaires.bloc7.titre}</h2>}
                                            </div>}
                                            </div>}
                                            


                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe) &&
                                            testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe))&&
                                            <div className="container_paragraphes">
                                            {para ==='parabloc1Fonct'?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe))&&
                                            <div id="parabloc1Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>
                                            }
                                            </div>

                                            :para === 'parabloc2Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc2.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc2.paragraphe))&&
                                            <div id="parabloc2Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc2.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>
                                            
                                            :para === 'parabloc3Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc3.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc3.paragraphe))&&
                                            <div id="parabloc3Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc3.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>

                                            :para === 'parabloc4Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc4.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc4.paragraphe))&&
                                            <div id="parabloc4Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc4.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>

                                            :para === 'parabloc5Fonct' ?
                                            <div className="section_bloc_paragraphes"> 
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc5.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc5.paragraphe))&&
                                            <div id="parabloc5Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc5.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>

                                            :para === 'parabloc6Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc6.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc6.paragraphe))&&
                                            <div id="parabloc6Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc6.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>

                                            :para === 'parabloc7Fonct' ?
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc7.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc7.paragraphe))&&
                                            <div id="parabloc7Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc7.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>

                                            :
                                            <div className="section_bloc_paragraphes">
                                            {testExist(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe) &&
                                             testValue(Object.values(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe))&&
                                            <div id="parabloc1Fonct" >{(ficheId.acf.section_fonctionnalites_supplementaires.bloc1.paragraphe).split("<br />").map((el,i) => (<p key={i}>{el}</p>))}</div>}
                                            </div>
                                            }
                                            </div>}     
                                </div> 
                            }



                            {/*===================================================================================================
                            =                                        section_caracteristiques                                
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_caracteristiques) && 
                            testValue(Object.values(ficheId.acf.section_caracteristiques)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionCaracteristiques" > 
                                        <h1>
                                            {testExist(ficheId.acf.section_caracteristiques.titre)&&
                                            <span> {ficheId.acf.section_caracteristiques.titre}</span>}
                                        </h1>
                                            
                                        <div id="container_caracteristique">
                                        {testExist(ficheId.acf.section_caracteristiques.paragraphe) &&

                                        <ul id="container_caracteristiqueUL">
                                           {(ficheId.acf.section_caracteristiques.paragraphe).split("<br />").map((el,i) => (
                                            <li key={i}>{el}</li>
                                         ))}
                                        
                                        </ul>
                                        
                                        }
                                        </div>
                                </div>}

                               

                            {/*===================================================================================================
                            =                                        section_avantages_inconvenients                              
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_avantages_inconvenients) && 
                            testValue(Object.values(ficheId.acf.section_avantages_inconvenients)[2]) &&
                                <div className="sectionsTyxal avantage-inconvenient"> 
                                            
                                        
                                        {testExist(ficheId.acf.section_avantages_inconvenients.titre)&&
                                        <h1> {(ficheId.acf.section_avantages_inconvenients.titre)}</h1>}
                                        <div className="containerAvantage">
                                        {testExist(ficheId.acf.section_avantages_inconvenients.bloc_1) &&
                                            <div id="bloc1_sectionAvantage" className="bloc_sectionAvantage">
                                            {testExist(ficheId.acf.section_avantages_inconvenients.bloc_1.titre) &&
                                            <h2>{ficheId.acf.section_avantages_inconvenients.bloc_1.titre}</h2>}
                                            {testExist(ficheId.acf.section_avantages_inconvenients.bloc_1.paragraphe) &&
                                            <div>{(ficheId.acf.section_avantages_inconvenients.bloc_1.paragraphe).split("<br />").map((el,i) => (
                                                <p key={i}>{el}</p>))}</div>}
                                            </div>}
                                        {testExist(ficheId.acf.section_avantages_inconvenients.bloc_2) &&
                                            <div id="bloc2_sectionAvantage" className="bloc_sectionAvantage">
                                            {testExist(ficheId.acf.section_avantages_inconvenients.bloc_2.titre) &&
                                            <h2>{ficheId.acf.section_avantages_inconvenients.bloc_2.titre}</h2>}
                                            {testExist(ficheId.acf.section_avantages_inconvenients.bloc_2.paragraphe) &&
                                             <div>{(ficheId.acf.section_avantages_inconvenients.bloc_2.paragraphe).split("<br />").map((el,i) => (
                                                <p key={i}>{el}</p>))}</div>}
                                            </div>}
                                        </div>
                                </div>
                            }



                            {/*===================================================================================================
                            =                                        section_explications                              
                            ====================================================================================================*/}


                            {testExist(ficheId.acf.section_explications) && 
                            testValue(Object.values(ficheId.acf.section_explications)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionExplication">
                            
                                    {testExist(ficheId.acf.section_explications.titre) &&
                                        <div>
                                         <h1>
                                            {testExist(ficheId.acf.section_explications.titre)&&
                                            <span> {ficheId.acf.section_explications.titre}</span>}
                                        </h1>
                                        </div>
                                    }
                            {/*......................................... bloc_1.................................................*/}
                                        {testExist(ficheId.acf.section_explications.bloc1) && 
                                        testValue(Object.values(ficheId.acf.section_explications.bloc1.titre))&&
                                        <div className="containerBloc_section_explication">

                                            <div className="blocTexte">
                                                {testExist(ficheId.acf.section_explications.bloc1.titre) &&
                                                <h2>{ficheId.acf.section_explications.bloc1.titre}</h2>}
                                                {testExist(ficheId.acf.section_explications.bloc1.paragraphe) &&
                                                <div>{(ficheId.acf.section_explications.bloc1.paragraphe).split("<br />").map((el,i) => (
                                                    <p key={i}>{el}</p>))}</div>}
                                                
                                            </div>

                                            <div className="blocVisuel">
                                                {testExist(ficheId.acf.section_explications.bloc1.visuel)&&
                                                <div>
                                                    {testExist(ficheId.acf.section_explications.bloc1.visuel)&&
                                                    <div className="ss_container_blocVisuel">
                                                    {testExist(ficheId.acf.section_explications.bloc1.visuel.photo)&&
                                                    <img className="imgTyxal" src={Object.values(ficheId.acf.section_explications.bloc1)[2].photo} alt=""/>}
                                                    </div>}  
                                                </div>}
                                            </div>
                                        </div>
                                        }
                            {/*......................................... bloc_2.................................................*/}
                                        {testExist(ficheId.acf.section_explications.bloc2) && 
                                        testValue(Object.values(ficheId.acf.section_explications.bloc2.titre)) &&
                                        <div className="containerBloc_section_explication">

                                            <div className="blocTexte">
                                                {testExist(ficheId.acf.section_explications.bloc2.titre) &&
                                                <h2>{ficheId.acf.section_explications.bloc2.titre}</h2>}
                                                {testExist(ficheId.acf.section_explications.bloc2.paragraphe) &&
                                                <div>{(ficheId.acf.section_explications.bloc2.paragraphe).split("<br />").map((el,i) => (
                                                    <p key={i}>{el}</p>))}</div>}
                                            </div>

                                            <div className="blocVisuel">
                                                {testExist(ficheId.acf.section_explications.bloc2.visuel)&&
                                                <div>
                                                    {testExist(ficheId.acf.section_explications.bloc2.visuel)&&
                                                    <div className="ss_container_blocVisuel">
                                                    {testExist(ficheId.acf.section_explications.bloc2.visuel.photo)&&
                                                    <img className="imgTyxal" src={Object.values(ficheId.acf.section_explications.bloc2)[2].photo} alt=""/>}
                                                    </div>}  
                                                </div>}
                                            </div>
                                        </div>
                                        }
                            {/*......................................... bloc_3.................................................*/}
                                        {testExist(ficheId.acf.section_explications.bloc3) && 
                                        testValue(Object.values(ficheId.acf.section_explications.bloc3.titre)) &&
                                        <div className="containerBloc_section_explication">

                                            <div className="blocTexte">
                                                {testExist(ficheId.acf.section_explications.bloc3.titre) &&
                                                <h2>{ficheId.acf.section_explications.bloc3.titre}</h2>}
                                                {testExist(ficheId.acf.section_explications.bloc3.paragraphe) &&
                                                <div>{(ficheId.acf.section_explications.bloc3.paragraphe).split("<br />").map((el,i) => (
                                                    <p key={i}>{el}</p>))}</div>}
                                            </div>

                                            <div className="blocVisuel">
                                                {testExist(ficheId.acf.section_explications.bloc3.visuel)&&
                                                <div>
                                                    {testExist(ficheId.acf.section_explications.bloc3.visuel)&&
                                                    <div className="ss_container_blocVisuel">
                                                    {testExist(ficheId.acf.section_explications.bloc3.visuel.photo)&&
                                                    <img className="imgTyxal" src={Object.values(ficheId.acf.section_explications.bloc3)[2].photo} alt=""/>}
                                                    </div>}  
                                                </div>}
                                            </div>
                                        </div>
                                        }
                                 </div>
                            }


                               {/*===================================================================================================
                            =                                        section_explication_image                            
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_explication_image) && 
                             testValue(Object.values(ficheId.acf.section_explication_image)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionExemple">

                            {testExist(ficheId.acf.section_explication_image.titre) &&
                                <div>
                                 <h1>
                                    {testExist(ficheId.acf.section_explication_image.titre)&&
                                    <span> {ficheId.acf.section_explication_image.titre}</span>}
                                </h1>
                                </div>
                            }

                            {testExist(ficheId.acf.section_explication_image.galerie) && 
                                testValue(Object.values(ficheId.acf.section_explication_image)[1])&&
                                <div className="galerie-explication">

                            {testExist(ficheId.acf.section_explication_image.galerie.images) && 
                            testValue(Object.values(ficheId.acf.section_explication_image)[1].images)&&
                                <Draggable
                                axis="x"
                                bounds={{top: 0, left: -length1, right: 0, bottom: 0}}
                                >
                                <div className={sizeGalerieImg===1?"blocImage-explication":"blocImage-explicationDraggable"}>
                                {testExist(ficheId.acf.section_explication_image.galerie.images.image_1)&&
                                <div className="ssblocImg-explication">
                                <img src={Object.values(ficheId.acf.section_explication_image)[1].images.image_1} alt="" />
                                </div>}
                                {testExist(ficheId.acf.section_explication_image.galerie.images.image_2)&&
                                <div className="ssblocImg-explication">
                                <img src={Object.values(ficheId.acf.section_explication_image)[1].images.image_2} alt="" />
                                </div>}
                                {testExist(ficheId.acf.section_explication_image.galerie.images.image_3)&&
                                <div className="ssblocImg-explication">
                                <img  src={Object.values(ficheId.acf.section_explication_image)[1].images.image_3} alt="" />
                                </div>}
                                </div>
                                </Draggable>
                                }  
                             </div>}  
                            </div>}

    
                    
                            {/*===================================================================================================
                            =                                        section_exemple                             
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_exemples) && 
                             testValue(Object.values(ficheId.acf.section_exemples)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionExemple">

                            {testExist(ficheId.acf.section_exemples.titre) &&
                                <div>
                                 <h1>
                                    {testExist(ficheId.acf.section_exemples.titre)&&
                                    <span> {ficheId.acf.section_exemples.titre}</span>}
                                </h1>
                                </div>
                            }

                            {testExist(ficheId.acf.section_exemples.galerie) && 
                                testValue(Object.values(ficheId.acf.section_exemples)[1])&&
                                <div className="galerie">

                            {testExist(ficheId.acf.section_exemples.galerie.images) && 
                            testValue(Object.values(ficheId.acf.section_exemples)[1].images)&&
                                <div className="blocImage">
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_1)&&
                                testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_1))&&
                                <div className={NumberPopUp ===1&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp ===1&& popUp? "ImgFull" : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_1} alt="" onClick={()=>affichePopUp(1)}/>
                                </div>}
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_2)&&
                                 testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_2))&&
                                <div className={NumberPopUp ===2&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp===2 && popUp? "ImgFull" : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_2} alt="" onClick={()=>affichePopUp(2)}/>
                                </div>}
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_3)&&
                                 testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_3))&&
                                <div className={NumberPopUp ===3&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp===3 && popUp? "ImgFull" : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_3} alt="" onClick={()=>affichePopUp(3)}/>
                                </div>}
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_4)&&
                                 testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_4))&&
                                <div className={NumberPopUp ===4&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp===4 && popUp? "ImgFull" : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_4} alt="" onClick={()=>affichePopUp(4)}/>
                                </div>}
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_5)&&
                                 testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_5))&&
                                <div className={NumberPopUp ===5&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp===5 && popUp? "ImgFull" : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_5} alt="" onClick={()=>affichePopUp(5)}/>
                                </div>}
                                {testExist(ficheId.acf.section_exemples.galerie.images.image_6)&&
                                 testValue(Object.values(ficheId.acf.section_exemples.galerie.images.image_6))&&
                                <div className={NumberPopUp ===6&& popUp? "ssblocImgFull" : "ssblocImg"}>
                                <img  className={NumberPopUp===6 && popUp? "ImgFull " : "ImgNormal"} src={Object.values(ficheId.acf.section_exemples)[1].images.image_6} alt="" onClick={()=>affichePopUp(6)}/>
                                </div>}
                                </div>}  
                             </div>}  
                            </div>}
                         


                            {/*===================================================================================================
                            =                                        section_video                              
                            ====================================================================================================*/}
                            {testExist(ficheId.acf.section_videos) && 
                            testValue(Object.values(ficheId.acf.section_videos)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionVideos">

                            {testExist(ficheId.acf.section_videos.titre) &&
                                <div>
                                 <h1>
                                    {testExist(ficheId.acf.section_videos.titre)&&
                                    <span> {ficheId.acf.section_videos.titre}</span>}
                                </h1>
                                </div>
                            }
                              <div className="galerie-video">
                            {testExist(ficheId.acf.section_videos) && 
                                testValue(Object.values(ficheId.acf.section_videos)[1])&&
                                <Draggable
                                axis="x"
                                bounds={{top: 0, left: length2 > 0 ? -length2 : 0, right: 0, bottom: 0}}
                                >
                                   
                                <div className="blocImage-video">    
                                {testExist(ficheId.acf.section_videos.videoint.video)&&
                                <div className="ssblocImg-video">
                                <video className="videoTyxal-sectionVideo" width="70vh" height="100%" object-position="cover" controls="controls" loop poster={ficheId.acf.section_videos.videoint.image}  src={ficheId.acf.section_videos.videoint.video} type="video/mp4"></video>
                                </div>
                                } 
                                {testExist(ficheId.acf.section_videos.videoint2.video)&&
                                <div className="ssblocImg-video">
                                 <video className="videoTyxal-sectionVideo" width="70vh" height="100%" object-position="cover" controls="controls" loop poster={ficheId.acf.section_videos.videoint2.image}  src={ficheId.acf.section_videos.videoint2.video} type="video/mp4"></video>
                                </div>
                                } 
                                {testExist(ficheId.acf.section_videos.videoint3.video)&&
                                <div className="ssblocImg-video">
                                 <video className="videoTyxal-sectionVideo" width="70vh" height="100%" object-position="cover" controls="controls" loop poster={ficheId.acf.section_videos.videoint3.image}  src={ficheId.acf.section_videos.videoint3.video} type="video/mp4"></video>
                                </div>
                                } 
                                {testExist(ficheId.acf.section_videos.videoext)&&
                                <div className="ssblocImg-video">
                                <ReactPlayer className=" videoTyxal-sectionVideo" url={ficheId.acf.section_videos.videoext} width="70vw" height="100%" controls allowFullScreen 
                                config={{
                                    youtube: {
                                      playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0, width:"100%"},
                                
                                    }
                                  }}
                                />
                                </div>
                                }
                                {testExist(ficheId.acf.section_videos.videoext2)&&
                                <div className="ssblocImg-video">
                                <ReactPlayer className=" videoTyxal-sectionVideo" url={ficheId.acf.section_videos.videoext2} width="70vw" height="100%" controls allowFullScreen 
                                config={{
                                    youtube: {
                                      playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0, width:"100%"},
                                
                                    }
                                  }}
                                />
                                </div>
                                } 
                                {testExist(ficheId.acf.section_videos.videoext3)&&
                                <div className="ssblocImg-video">
                                <ReactPlayer className=" videoTyxal-sectionVideo" url={ficheId.acf.section_videos.videoext3} width="70vw" height="100%" controls allowFullScreen 
                                config={{
                                    youtube: {
                                      playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0, width:"100%"},
                                
                                    }
                                  }}
                                />
                                </div>
                                } 
                                </div>
                                </Draggable>
                             }  
                             </div>
                            </div>}



                            {/*===================================================================================================
                            =                                        section_supports_multimedia                            
                            ====================================================================================================*/}
                           {testExist(ficheId.acf.section_supports_multimedia) && 
                            testValue(Object.values(ficheId.acf.section_supports_multimedia)[0]) &&
                                <div className="sectionsTyxal sectionsTyxal--white sectionMultimedia">

                            {testExist(ficheId.acf.section_supports_multimedia.titre) &&
                                <div>
                                 <h1>
                                    {testExist(ficheId.acf.section_supports_multimedia.titre)&&
                                    <span> {ficheId.acf.section_supports_multimedia.titre}</span>}
                                </h1>
                                </div>
                            }

                            {testExist(ficheId.acf.section_supports_multimedia.texte) && 
                                testValue(Object.values(ficheId.acf.section_supports_multimedia)[1])&&
                                <div className="blocTexte">
                                   <div>{(ficheId.acf.section_supports_multimedia.texte).split("<br />").map((el,i) => (
                                    <p key={i}>{el}</p>))}</div>
                                </div>
                            } 
                            {testExist(ficheId.acf.section_supports_multimedia.image) && 
                                testValue(Object.values(ficheId.acf.section_supports_multimedia)[2])&&
                                <div className="blocIcones">           
                                {testExist(ficheId.acf.section_supports_multimedia.image)&&
                                <img className="imgMiniTyxal" src={Object.values(ficheId.acf.section_supports_multimedia)[2]} alt=""/>}
                                </div>
                                
                            } 
                            </div>} 


                    </div>
                </div>
                :
                <div>
                    en cours...
                </div>
            }
        </div>
    );
};
