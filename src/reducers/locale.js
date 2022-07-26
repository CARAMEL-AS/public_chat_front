import supportedLangs from '../resources/supportedLangs.json';
const initialData = {
    prev: 'en-US',
    current: 'en-US'
}

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {prev: state.current, current: supportedLangs[action.payload] }
        default:
            return state
    }
}

export default reducer;