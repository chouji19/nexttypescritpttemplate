import React, { createContext, useEffect, useReducer } from 'react';
import { User, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import backApi from '../apis/backApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: User ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        const token = localStorage.getItem('token');
        
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        const resp = await backApi.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        localStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.user
            }
        });
    }


    const signIn = async({ email, password }: LoginData ) => {

        try {
         
            const { data } = await backApi.post<LoginResponse>('/auth/login', { email, password } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            localStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    
    const signUp = async( { email, password }: User ) => {

        try {
         
            const { data } = await backApi.post<LoginResponse>('/Users', { email, password } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.user
                }
            });

            localStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }

    };

    const logOut = async() => {
        localStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}


