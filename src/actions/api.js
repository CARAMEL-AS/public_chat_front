export const API = 'API';

export const selectApi = () => {
    return async (dispatch) => {
        dispatch({
            type: API,
            payload: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
                process.env.REACT_APP_STAG : process.env.REACT_APP_PROD
        })
    }
}