import React, { useEffect, useState} from 'react';
import Lottie from 'react-lottie';
import badWord from '../../assets/bad_word.json';
import { apologies } from '../../helper/api';

const Punishment = (props) => {
    
    const { uId, count, close } = props;
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const closePunishmentDialog = () => {
        close({
            visible: false,
            count: 0
        })
    }

    const apologiesHandler = async () => {
        if(count >= 3) {
            const resp = await apologies(uId);
            closePunishmentDialog();
        } else {
            closePunishmentDialog();
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{height: dimentions.height/1.5, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{width: '100%', marginTop: '5%', textAlign: 'center'}}>
                    {count < 3 ? <p style={{fontSize: 17, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)'}}>{`This is your ${count}${count === 1 ? 'st' : 'nd'} Warning!`}</p> : <p style={{fontSize: 17, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)'}}>You have crossed your limits!</p>}
                </div>
                <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: badWord,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice"
                        }}
                    }
                    height={220}
                    width={220}
                    style={{marginTop: '2%'}}
                />
                <div onClick={apologiesHandler} style={{marginTop: '5%', width: '40%', height: '13%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 8, cursor: 'pointer'}}>
                    <p style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>{count < 3 ? 'Okay' : 'My Apologies!'.toUpperCase()}</p>
                </div>
            </div>
        </div>
    )
}

export default Punishment