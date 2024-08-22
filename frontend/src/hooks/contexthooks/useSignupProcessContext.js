import { useContext } from 'react'
import { SignupProcessContext } from '../../contexts/SignupProcessContext'

export const useSignupProcessContext = () => {
    const context = useContext( SignupProcessContext )

    if (!context){
        throw Error('useSignupProcessContext must be used inside the scope of the provider')
    }

    return context
}