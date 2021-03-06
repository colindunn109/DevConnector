import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
            .then(res => history.push('/login'))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// Login User
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to local storage
            const { token } = res.data;

            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decodedToken = jwt_decode(token);
            dispatch(setCurrentUser(decodedToken))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Set logged in user
export const setCurrentUser = (decodedToken) => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken
    }
};


// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}