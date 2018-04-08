import axios from 'axios';
export const getPosts = function(cur_page){ 
    return async function(dispatch){
        var url = '/api/posts/'  + cur_page;
        function onSuccess(success) {
            dispatch({ 
                type: 'GET_POSTS', 
                payload: success 
            });
            return success;
        }
        function onError(error) {
            dispatch({ 
                type: 'POSTS_ERROR', 
                payload: error 
            });
            return error;
        }
        try {
            const success = await axios.get(url);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}
//
export const getPost = function(title){ 
    return async dispatch => {
        var url = '/api/post/'  + title;
        function onSuccess(success) {
            dispatch({ 
                type: 'GET_POST', 
                payload: success 
            });
            return success;
        }
        function onError(error) {
            dispatch({ 
                type: 'POST_ERROR', 
                payload: error 
            });
            return error;
        }
        try {
            const success = await axios.get(url);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}
//
export const addPost = function(post){ 
    return async dispatch => {
        function onSuccess(success) {
            dispatch({ 
                type: 'ADD_POST', 
                payload: success 
            });
            return success;
        }
        function onError(error) {
            dispatch({ 
                type: 'POST_ERROR', 
                payload: error 
            });
            return error;
        }
        try {
            const success = await axios.post('/api/post/', post);
            var numberOfWords = success.data.number;
            console.log('words ', numberOfWords);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}
//
export const deletePost = function(filename){ 
    return async dispatch => {
        function onSuccess(success) {
            dispatch({ 
                type: 'DELETE_POST', 
                payload: success 
            });
            return success;
        }
        function onError(error) {
            dispatch({ 
                type: 'POST_ERROR', 
                payload: error 
            });
            return error;
        }
        try {
            const success = await axios.delete('/api/post/' + filename);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}
//
export const updatePost = function(filename, post){ 
    return async dispatch => {
        function onSuccess(success) {
            dispatch({ 
                type: 'UPDATE_POST', 
                payload: success 
            });
            return success;
        }
        function onError(error) {
            dispatch({ 
                type: 'POST_ERROR', 
                payload: error 
            });
            return error;
        }
        try {
            const success = await axios.put('/api/post/' + filename, post);
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}