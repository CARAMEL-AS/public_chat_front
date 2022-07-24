const initialData = false;

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'OPEN_IMAGE_PICKER':
            return true;
        case 'CLOSE_IMAGE_PICKER':
            return false;
        default:
            return state
    }
}

export default reducer;