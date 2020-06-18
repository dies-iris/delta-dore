import React, { Children } from 'react';

export default function Drawer(props){

    return(
        <div className="drawer-page">
            {
                props.backdrop &&
                <div className={props.open ? "backdrop open" : "backdrop"} onClick={props.close}></div>
            }
            <div className={props.open ? "drawer open "+props.orientation : "drawer "+props.orientation}>
                {Children}
            </div>
        </div>
    )
}