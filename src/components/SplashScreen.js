import React, { useEffect, useState} from 'react';

import '../styles/MaisonConnect.css';


export default function SplashScreen (props) {

  const[time,setTime]=useState(true);

  useEffect(() => {
    const timer = setTimeout((time) => {
      console.log('This will run after 2 second!');
      setTime(false);
      props.stop();
    }, 2000);
    
    return () => clearTimeout(timer);
  });

  
    return(
   
      <div className="fullwidth">       
        {props.data && time &&
          <div className="SplashScreen" style={{backgroundImage:'url('+props.data.splashscreen+')'}}>
              <div className="bloc">
                <h1>{props.data.titre.toUpperCase()}</h1>
              </div>
          </div>
        }
      </div>
    );
}


