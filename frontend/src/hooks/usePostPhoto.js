import { useState } from 'react'
import { useAuthContext } from './contexthooks/useAuthContext'

export const usePostPhoto  = () => {

    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const postPhoto = async (image, location, date, user_id) => {

            setLoading(true);
            setError(null);

            console.log('new Photo Entry: ')
            console.log(image, location, date, user_id)

            // new Photo placeholder
            let formData = new FormData()
            formData.append('image', image)
            formData.append('location', location)
            formData.append('date', date)
            formData.append('user_id', user_id)

            try {            
                const response = await fetch('/api/photo', {
                    method: 'POST',
                    headers: { 
                        'Authorization': `Bearer ${ user.token }` 
                    },
                    body: formData
                })

                const json = await response.json()

                if (!response.ok) {
                    setLoading(false)
                    setError(json.error)
                }

                if ( response.ok ){


                    setLoading(false)
                    return json
                }
            } catch (err) {
                setError(err.message);
            } 
        }

        return { postPhoto, loading, error }
}
