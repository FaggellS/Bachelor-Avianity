import { useState } from 'react'

export const useSignup = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)


    const signup = async ( email, username, password ) => {
        // signup process starts (/starts over)
        setIsLoading(true)
        setError(null)

        const user = { email, username, password }

        try{
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
            })

            // if ok, should be : mail
            const json = await response.json()
            
            console.log("response to fetch : " + json.error)
            console.log("response: " + response.ok)
            // or if not response..
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)

                return false
            }

            if(response.ok){

                // if ok, we'll wait on confirmation page
                setIsLoading(false)
                return true

            }
        } catch ( error ) {
            console.log("useSignup signup: an error occured: ")
            console.log(error.message) 
        }
        
    }



    return { signup, isLoading, error }
}