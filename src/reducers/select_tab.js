const initialData = 'Friends'

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'SELECT_TAB':
            return action.payload
        default:
            return state
    }
}

export default reducer;