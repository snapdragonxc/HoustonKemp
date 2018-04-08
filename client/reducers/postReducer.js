export default (state = [], action) => {
    switch (action.type) {
        case 'GET_POST':
            return action.payload.data;
        case 'DELETE_POST':
            return action.payload.data;
        case 'POST_ERROR':
            return {
                status: action.payload.response.status,
                msg: action.payload.response.data
            }            
        default:
            return state;
    }
}