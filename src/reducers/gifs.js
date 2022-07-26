const initialData = null;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'INITIALIZE_GIPHY':
            return action.payload
        default:
            return state
    }
}

export default reducer;