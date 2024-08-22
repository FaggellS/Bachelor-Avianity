import { useAuthContext } from '../contexthooks/useAuthContext'
import { useState, useEffect } from 'react'

const useLocationSelect = () => {
    const { user } = useAuthContext()
    const [locList, setLocList] = useState()

    useEffect( () => {
        const fetchLoc = async () => {

            const response = await fetch('/api/commune', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })

            const json = await response.json()

            const locOptions = json.map(entry => ({
                value: entry.name,
                label: `${entry.postal_code} ${entry.name}`
            }))

            setLocList(locOptions)
        }

        fetchLoc()
    }, [user])


    return locList
}

export default useLocationSelect