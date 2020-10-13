import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }
        default:
            return state
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin(time) {
    return dispatch => {
        const token = localStorage.getItem('token')

        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

