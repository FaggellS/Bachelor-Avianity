import { createContext, useReducer } from 'react'

export const ExploreContext = createContext()

export const exploreContextReducer = ( state, action ) => {
    switch( action.type ){
        case "SET_ALL":
            return { selection: action.payload.selection, filterStatus:action.payload.filterStatus, filterSpecies:action.payload.filterSpecies }

        default:

            return state



    }

}

export const ExploreContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( exploreContextReducer, { selection:null, filterStatus:null, filterSpecies:null } )

    return (
        <ExploreContext.Provider value= { { ...state, dispatch } }>

            { children }

        </ExploreContext.Provider>
    )
}