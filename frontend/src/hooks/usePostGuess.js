import { useState } from 'react'
import { useAuthContext } from './contexthooks/useAuthContext'

export const usePostGuess  = () => {

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const postGuess = async (photo_id, species, confidence, user_id) => {

            setLoading(true);
            setError(null);

            console.log('new Guess Entry: ')
            console.log(photo_id, species, confidence, user_id)





            try {            
                const res = await fetch('/api/user/' + user_id, {
                    headers: {  }
                })
        
                const userObject = await res.json()
                const status = userObject.member_status

                // new Guess placeholder
                const object = { photo_id, species, confidence, user_id, status }

                // send new Guess to backend
                const response = await fetch('/api/guess', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ user.token }` 
                    },
                    body: JSON.stringify( object )
                })

                const json = await response.json()

                if (!response.ok) { 
                    setLoading(false)
                    setError(json.error)
                } 

                if( response.ok ){
                    setLoading(false)
                    return json
                }

            } catch (err) {
                setError(err.message);
            } 
        }

        return { postGuess, loading, error }
}
