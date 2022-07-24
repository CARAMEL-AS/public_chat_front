const initialData = false;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'OPEN_NEW_FORM':
            return action.payload
        case 'CLOSE_NEW_FORM':
            return initialData;
        case 'USER_SIGN_OUT':
            return initialData;
        default:
            return state
    }
}

export default reducer;