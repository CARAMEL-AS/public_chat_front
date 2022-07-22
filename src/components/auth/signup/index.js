import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../common/inputField';
import Button from '../../common/button';
import { signup } from '../../../helper/api';

const Signup = () => {

    const dispatch = useDispatch();
    const api = useSelector(state => state.api);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repassword: ''
    })
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const signupAttempt = async () => {
        if(inputs.password === inputs.repassword) {
            const userInfo = await signup(inputs.email, inputs.password, api)
            if(!userInfo?.errors || !userInfo?.error) {
                await dispatch({type: 'USER_SIGN_UP', payload: userInfo})
            } else {
                // HANDLE ERROR
            }
        } else {
            // HANDLE ERROR
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDimentions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        })
    },[])

    useEffect(() => {
        if(inputs.email.length > 0 && inputs.password.length > 0 && inputs.repassword.length > 0) {
            if(inputs.password === inputs.repassword) {
                setIsButtonDisabled(false)
            } else {
                setIsButtonDisabled(true)
            }
        } else {
            setIsButtonDisabled(true)
        }
    },[inputs])

    return (
        <div style={{height: dimentions.height/2.5, width: dimentions.width/3, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column'}}>
            <InputField type="text" placeholder={'Email'} onChangeText={(e) => setInputs({...inputs, email: e})} />
            <InputField type="password" placeholder={'Password'} onChangeText={(e) => setInputs({...inputs, password: e})} />
            <InputField type="password" placeholder={'Confirm Password'} onChangeText={(e) => setInputs({...inputs, repassword: e})} />
            <Button onClick={signupAttempt} disabled={isButtonDisabled} action={'SIGN UP'} />
        </div>
    )
}

export default Signup;