const initialData = {
    id: null,
    title: '',
    messages: []
}

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'DEFAULT_CHAT':
            return action.payload;
        case 'CHANGE_CHAT':
            return action.payload;
        case 'USER_SIGN_OUT':
            return initialData;
        default:
            return state
    }
}

export default reducer;