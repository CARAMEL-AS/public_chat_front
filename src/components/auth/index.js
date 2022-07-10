import React, { useEffect, useState} from 'react';
import Login from './login';
import Signup from './signup';

const Auth = (props) => {

    const { setUser } = props;
    const [login, setLogin] = useState(false);

    return (
        <div>
            {login ? <Login /> : <Signup />}
        </div>
    )
}

export default Auth