const initialData = null

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'SELECT_CHAT':
            return action.payload
        default:
            return state
    }
}

export default reducer;