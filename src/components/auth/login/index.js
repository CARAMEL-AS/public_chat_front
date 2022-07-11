import React, { useEffect, useState } from 'react';
import InputField from '../../common/inputField';
import Button from '../../common/button';
import { getAuth } from '../../../helper/api';

const Login = (props) => {

    const { setUser } = props;
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const [dimentions, setDimentions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    const loginAttempt = async () => {
        const userInfo = await getAuth(inputs.email, inputs.password);
        if(!userInfo?.error) {
            setUser(userInfo)
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
        if(inputs.email.length > 0 && inputs.password.length > 0) setIsButtonDisabled(false)
        else setIsButtonDisabled(true)
    },[inputs])

    return (
        <div style={{height: dimentions.height/2.5, width: dimentions.width/3, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column'}}>
            <InputField type="text" placeholder={'Email'} onChangeText={(e) => setInputs({...inputs, email: e})} />
            <InputField type="password" placeholder={'Password'} onChangeText={(e) => setInputs({...inputs, password: e})} />
            <Button onClick={loginAttempt} disabled={isButtonDisabled} action={'LOGIN'} />
        </div>
    )
}

export default Login;