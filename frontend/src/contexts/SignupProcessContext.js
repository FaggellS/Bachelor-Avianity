import { createContext, useReducer } from "react"

export const SignupProcessContext = createContext()

export const signupProcessContextReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'SET_MAIL':
            return { email: action.payload.email }
            
        case 'DELETE_MAIL':
            return { email:null }

        default: return state
    }
}

export const SignupProcessContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( signupProcessContextReducer, { email:null } )
    
    return (
        <SignupProcessContext.Provider value = { { ...state, dispatch } }>
            { children }
        </SignupProcessContext.Provider>
    )
}