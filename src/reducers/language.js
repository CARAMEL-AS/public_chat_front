const initialData = false;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'OPEN_LANGUAGE_PICKER':
            return true;
        case 'CLOSE_LANGUAGE_PICKER':
            return false;
        default:
            return state
    }
}

export default reducer;