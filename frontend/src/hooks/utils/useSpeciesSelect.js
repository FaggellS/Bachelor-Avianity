import { useAuthContext } from '../contexthooks/useAuthContext'
import { useState, useEffect } from 'react'

const useSpeciesSelect = () => {
    const { user } = useAuthContext()
    const [speciesList, setSpeciesList] = useState([])

    useEffect(() => {
        const fetchSpecies = async () => {
            const response = await fetch('/api/species', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })

            const json = await response.json()

            const speciesOptions = json.map(entry => ({
                value: entry.francais,
                label: entry.francais
            }))

            setSpeciesList(speciesOptions)
        }

        fetchSpecies()
    }, [user])

    
    return speciesList
}


export default useSpeciesSelect