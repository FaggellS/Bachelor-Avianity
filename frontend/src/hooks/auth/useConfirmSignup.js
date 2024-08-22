import { useState } from 'react'
import { useAuthContext } from '../contexthooks/useAuthContext'
import { useSignupProcessContext } from '../contexthooks/useSignupProcessContext'

export const useConfirmSignup = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: signupProcessDispatch } = useSignupProcessContext()

    const confirmSignup = async ( email, code ) => {
        // confirm signup process starts
        setIsLoading(true)
        setError(null)

        const user = { email, code }

        try {
            const response = await fetch('/api/user/confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
            })

            // if ok, should return {user_id, username, email, token}
            const json = await response.json()

            // if not ok, returns errors
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)

                return false
            }

            if(response.ok){
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update auth context
                authDispatch({
                    type: 'LOGIN',
                    payload: json
                })

                // reset signup context
                signupProcessDispatch({
                    type: 'DELETE_MAIL',
                    payload: null
                })

                alert("Your account has been successfully registered, Welcome !")

                setIsLoading(false)
                return true
            }
        } catch ( error ) {

            console.log("useConfirmSignup confirmSignup: an error occured: ")
            console.log(error.message) 
        }
    }

    return { confirmSignup, isLoading, error }
}