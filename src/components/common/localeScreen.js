import React, { useEffect, useState } from 'react';

const LocaleScreen = (props) => {

    const { visible } = props;
    const [pageOpacity, setPageOpacity] = useState(0);
    const [innerPageBottom, setInnerPageBottom] = useState(-500)
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const hidePage = () => {
        setPageOpacity(0);
        setInnerPageBottom(-500);
    }

    const displayPage = () => {
        setPageOpacity(1);
        setInnerPageBottom(0);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
        if(visible) {
            displayPage();
        }
    },[])

    console.log('Here we are')

    return(
        <div style={{height: dimentions.height, width: dimentions.width, opacity: pageOpacity, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease"}}>
            <div style={{height: dimentions.height, width: dimentions.width, position: 'absolute', bottom: innerPageBottom, backgroundColor: 'white', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease"}}>

            </div>
        </div>
    )
}

export default LocaleScreen;