import React, {useState} from 'react';
import ReactPlayer from "react-player";
import Draggable from 'react-draggable';
import Arrow from '../assets/up.png';

import '../styles/Lifedomus.css';

export default function Tutoriels(props){

    const [video,setVideo] = useState(0);

    let length = props.tuto.length*(150+20) - window.innerWidth;

    return(        

        <div className="container_tuto">
            <img src={Arrow} alt='retour' className="retour" onClick={props.retour} />

            {props.tuto[video].acf.video_tutoriel_url?
                <div className="tuto_video">
                    <ReactPlayer url={props.tuto[video].acf.video_tutoriel_url} 
                        width="100%" height="100%" controls allowFullScreen
                        // pip="false" 
                        config={{
                        youtube: {
                            playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0 },
                            // embedOptions: 
                        }
                        }}
                    />
                </div>
                :
                <div className="tuto_video">
                    <ReactPlayer url={props.tuto[video].acf.video_tutoriel_fichier} 
                    width="100%" height="100%" controls allowFullScreen
                    // pip="false" 
                    config={{
                    youtube: {
                        playerVars: { color: "#24AD8D", showinfo: 0, modestBranding: 1, rel: 0 },
                        // embedOptions: 
                    }
                    }}
                    />
                </div>
            }
            <Draggable axis="x" bounds={{left: length > 4 ? -length : 0, top: 0, right: 0, bottom: 0}}>
                <div className="liste_tuto hidden">
                {props.tuto.length>0 ?      

                props.tuto.map((tutoriels,i) =>
                    tutoriels.acf.tutoriel &&
                        <div onClick={() => setVideo(i)} className="vignette_tuto" style={{backgroundImage : "url("+tutoriels.acf.vignette_tutoriel+")"}}><p key={i} >{tutoriels.acf.titre_tutoriel}</p></div>
                    
                )

                : 
                <p>Chargement...</p>
                }
                </div>
            </Draggable>
        </div>

    )
}