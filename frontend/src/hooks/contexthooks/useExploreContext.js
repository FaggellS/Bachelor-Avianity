import { useContext } from 'react'
import { ExploreContext } from '../../contexts/ExploreContext'



export const useExploreContext = () => {
    const context = useContext( ExploreContext )

    if (!context){
        throw Error('useExploreContext must be used inside the scope of the provider')
    }

    return context
}