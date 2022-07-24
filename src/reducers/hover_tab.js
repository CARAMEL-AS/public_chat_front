const initialData = ''

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'HOVER_TAB':
            return action.payload
        default:
            return state
    }
}

export default reducer;