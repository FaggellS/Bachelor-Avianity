import { useContext } from 'react'
import { IdentifyContext } from '../../contexts/IdentifyContext'


export const useIdentifyContext = () => {
    const context = useContext( IdentifyContext )

    if (!context){
        throw Error('useIdentifyContext must be used inside the scope of the provider')
    }

    return context
}