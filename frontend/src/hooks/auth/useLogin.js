import { useState } from 'react'
import { useAuthContext } from '../contexthooks/useAuthContext'

export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const { dispatch } = useAuthContext()

    const login = async ( email, password ) => {
        // login process starts (/starts over)

        setIsLoading(true)
        setError(null)


        const user = { email, password }

        try {
            const response = await fetch('/api/user/login',
                {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
            })
            
            // if ok, should be : {user_id, username, email, token}
            const json = await response.json()
            
            // or not response..
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }

            if(response.ok){

                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update auth context
                dispatch({
                    type: 'LOGIN',
                    payload: json
                })

                setIsLoading(false)
            }
        } catch ( error ){ 
            
            console.log("useLogin login: an error occured: ")
            console.log(error.message) 
        }
    }

    return { login, isLoading, error }
}