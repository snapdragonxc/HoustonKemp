export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return action.payload.data;
        case 'POSTS_ERROR':
            var err = {
                status: action.payload.response.status,
                msg: action.payload.response.data
            }
            return err;           
        default:
            return state;
    }
}