
const initialData = []

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ALL_CHATS':
            let tempState = state;
            if(action.payload.length > 0) {
                tempState = action.payload;
            }
            return tempState;
        case 'USER_SIGN_OUT':
            return initialData;
        default:
            return state
    }
}

export default reducer;