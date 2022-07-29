import React, { useState, useEffect } from 'react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import GifCell from './gifCell';

const MessageBox = (props) => {

    const { messageSend, typing, message } = props;
    const [displayMessageBox, setDisplayMessageBox] = useState(true);
    const [changeInProcess, setChangeInProcess] = useState(false);
    const [messageBoxMarginBottom ,setMessageBoxMarginBottom] = useState(0);
    const gifs = new GiphyFetch(process.env.REACT_APP_GIPHY_API);
    const [currentGifs, setCurrentGifs] = useState([]);
    const [currentGifSearch, setCurrentGifSearch] = useState('');
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const showMessageBox = () => {
        setTimeout(() => {
            setChangeInProcess(false);
        },[100])
        setMessageBoxMarginBottom(0)
    }

    const hideMessageBox = () => {
        setTimeout(() => {
            setDisplayMessageBox(!displayMessageBox);
            showMessageBox();
        },500)
        setMessageBoxMarginBottom(-200);
    }

    const changeAction = () => {
        setChangeInProcess(true);
    }

    const getGifs = async () => {
        if(currentGifSearch.length > 0) {
            setCurrentGifs(await gifs.search(currentGifSearch, {limit: 20}))
        } else {
            setCurrentGifs(await gifs.trending({limit: 20}))
        }
    }

    useEffect(() => {
        if(changeInProcess) {
            hideMessageBox();
        }
    },[changeInProcess])

    useEffect(() => {
        getGifs();
    },[currentGifSearch])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    return (
        <div style={{height: dimensions.height/8, width: dimensions.width/1.5, position: 'absolute', bottom: '1%', marginLeft: '1%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 7, marginBottom: messageBoxMarginBottom, transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease",}}>
            {displayMessageBox ? (
                <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <div onClick={changeAction} style={{margin: 0, marginLeft: '7%', height: '40%', width: '7%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8, marginBottom: '-0.4%', cursor: 'pointer'}}>
                        <p style={{fontSize: 15, fontWeight: '800', color: 'white'}}>GIF</p>
                    </div>
                    <div style={{height: '90%', width: '100%', display: 'flex', flexDirection: 'row', margin: 0, marginBottom: '0.5%'}}>
                        <div style={{height: '97%', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <input value={message} onChange={typing} style={{height: '80%', width: '100%', outline: 'none', borderRadius: 15, paddingLeft: '2%', fontSize: 15, fontWeight: '700', backgroundColor: 'rgba(58,58,58,1)', color: '#d3d3d3', opacity: 1}} placeholder={'Message'}/>
                        </div>
                        <div onClick={messageSend} style={{height: '80%', width: '10%', backgroundColor: '#32cd32', marginLeft: '1%', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                            <p style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Send</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{height: '150%', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '4%'}}>
                    <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                        <div onClick={changeAction} style={{margin: 0, marginLeft: '3%', height: '100%', width: '13%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8, marginBottom: '-0.4%', cursor: 'pointer'}}>
                            <p style={{fontSize: 15, fontWeight: '800', color: 'white'}}>MESSAGE</p>
                        </div>
                        <div style={{margin: 0, marginLeft: '3%', height: '100%', width: '70%', backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 8, borderTopLeftRadius: 8, marginBottom: '-0.4%', cursor: 'pointer'}}>
                            <p style={{fontSize: 15, fontWeight: '800', color: 'white', marginRight: '1.5%'}}>SEARCH</p>
                            <input onChange={(e) => setCurrentGifSearch(e.target.value)} style={{width: '75%', height: '70%', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.2)', paddingLeft: '1%', paddingRight: '1%', color: 'white', fontWeight: '700', outline: 'none'}} />
                        </div>
                    </div>
                    <div style={{height: '95%', width: '100%', display: 'flex', flexDirection: 'row', margin: 0, marginBottom: '0.1%', backgroundColor: 'rgba(58,58,58,0.7)', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'scroll'}}>
                        {currentGifs.data.map((gif, index) => {
                            return (
                                <GifCell key={index} gif={gif} />
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessageBox;