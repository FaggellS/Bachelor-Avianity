import { createContext, useReducer } from 'react'


export const IdentifyContext = createContext()

export const identifyContextReducer = ( state, action ) => {
    switch ( action.type ) {

        case 'SET_OBJECT':
            return { object: action.payload }

        case 'DELETE_SELECTED':
            return { object: null }

        default: return state
    }
}

export const IdentifyContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( identifyContextReducer, { object: null } )

    return (
        <IdentifyContext.Provider value = { { ...state, dispatch } } >
            { children }
        </IdentifyContext.Provider>
    )
}