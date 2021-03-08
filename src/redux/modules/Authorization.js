/**
 * @author Edward P. Legaspi
 * @version 0.0.1
 */
import Dispatch from '../Dispatch';

const INITIALIZE = 'authorization/INITIALIZE';
const LOGOUT = 'authorization/LOGOUT';
const UPDATE_TOKEN = 'authorization/UPDATE_TOKEN';

const initialState = {
    externalReferenceId: null,
    email: null,
    firstName: null,
    lastName: null,
    token: null,
    isLoading: false,
    isAuthenticated: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Dispatch.successAction(INITIALIZE):
        case Dispatch.successAction(UPDATE_TOKEN): {
            return {
                ...state,
                ...action.payload,
            };
        }
        case Dispatch.successAction(LOGOUT): {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
}

export const updateToken = authContext => dispatch => Dispatch.success(dispatch, UPDATE_TOKEN, {...authContext});

export const isLoading = isLoading => dispatch => Dispatch.success(dispatch, UPDATE_TOKEN, {...authContext, isLoading});

export const isAuthenticated = isAuthenticated => dispatch => Dispatch.success(dispatch, UPDATE_TOKEN, {...authContext, isAuthenticated});

export const logout = () => dispatch => Dispatch.success(dispatch, LOGOUT, {});