import supportedLangs from '../resources/supportedLangs.json';
const initialData = 'en-US'

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return supportedLangs[action.payload]
        default:
            return state
    }
}

export default reducer;