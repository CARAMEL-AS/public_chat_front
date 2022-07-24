const initialData = ''

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'HOVER_TAB':
            return action.payload
        case 'USER_SIGN_OUT':
                return initialData;
        default:
            return state
    }
}

export default reducer;