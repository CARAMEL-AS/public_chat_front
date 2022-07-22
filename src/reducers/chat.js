
const initialData = []

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'ALL_CHATS':
            let tempState = state;
            if(action.payload.length > 0) {
                tempState = action.payload;
            }
            return tempState;
        default:
            return state
    }
}

export default reducer;