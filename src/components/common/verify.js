import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import InputField from './inputField';
import Button from './button';
import { verifyAcc, uSignout } from '../../helper/api';

const Verify = (props) => {
    
    const { ulogout } = props;
    const dispatch = useDispatch();
    const [code, setCode] = useState('')
    const api = useSelector(state => state.api);
    const user = useSelector(state => state.user);
    const [pageOpacity, setPageOpacity] = useState(0);
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const onSubmitHandler = async () => {
        try {
            const resp = await verifyAcc(user.id, code, api)
            if (!resp?.error){
                await dispatch({type: 'USER_VERIFIED', payload: resp})
                await dispatch({type: 'ERROR', payload: `Welcome ${user.username}`});
            } else {
                await dispatch({type: 'ERROR', payload: resp?.error})
            }
        } catch (e) {
            await dispatch({type: 'ERROR', payload: 'Opps! Failed to connect to server.'})
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth});
        })
    },[])

    useEffect(() => {
        if(user) setPageOpacity(1)
        else setPageOpacity(0)
    },[user])

    return (
        <div style={{height: dimentions.height, width: dimentions.width, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: "all 0.5s ease", WebkitTransition: "all 0.5s ease", MozTransition: "all 0.5s ease", opacity: pageOpacity}}>
            <div style={{height: dimentions.height/1.5, width: dimentions.width/2, background: "linear-gradient(to right, #D3CCE3, #E9E4F0)", borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{fontSize: 18, fontWeight: '700', color: 'rgba(0,0,0,0.6)', marginTop: '7%'}}>Welcome to Chat-App</p>
                <p style={{fontSize: 20, fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', marginTop: '-2%'}}>{user.username}</p>
                <p style={{fontSize: 14, fontWeight: '400', color: 'rgba(0,0,0,0.5)', width: '70%', textAlign: 'center'}}>Please, check <strong>{user.email}</strong> and verify your email by entering the code.</p>
                <InputField type="text" placeholder={'CODE'} onChangeText={(e) => setCode(e)} style={{alignText: 'center'}} /> 
                <Button action='Verify' disabled={code.length === 0} onClick={onSubmitHandler} />
                <div onClick={ulogout} style={{cursor: 'pointer'}}>
                    <p style={{fontSize: 11, fontWeight: '600', color: 'red'}}>LOGOUT</p>
                </div>
            </div>
        </div>
    )
}

export default Verify