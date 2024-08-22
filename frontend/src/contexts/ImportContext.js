import { createContext, useReducer } from 'react'

export const ImportContext = createContext()

export const importReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'SET_IMAGE':
            return { newImage: action.payload.newImage, newUrl: action.payload.newUrl}

        case 'DELETE_IMAGE':
            return { newImage: null, newUrl: null}

        default: return state
    }
}

export const ImportContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( importReducer, { newImage: null, newUrl: null } )

    return (
        <ImportContext.Provider value = { { ...state, dispatch } } >
            { children }
        </ImportContext.Provider> 

    )
}

