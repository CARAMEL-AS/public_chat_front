const initialData = null;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'USER_SIGN_IN':
            return action.payload;
        case 'USER_SIGN_UP':
            return action.payload;
        case 'USER_VERIFIED':
            return action.payload;
        case 'USER_UPDATE_NAME':
            return {...state, username: action.payload};
        case 'USER_UPDATE_IMAGE':
            return {...state, image: action.payload};
        case 'USER_UPDATE_LANGUAGE':
            return {...state, language: action.payload}
        case 'USER_SIGN_OUT':
            return initialData;
        case 'USER_DELETE':
            return initialData;
        default:
            return state
    }
}

export default reducer;