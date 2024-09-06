// hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImportContext } from '../../hooks/contexthooks/useImportContext'
import { useAuthContext } from '../../hooks/contexthooks/useAuthContext'

// utils
import { usePostPhoto } from '../../hooks/usePostPhoto'
import { usePostGuess } from '../../hooks/usePostGuess'
import useSpeciesSelect from '../../hooks/utils/useSpeciesSelect' 
import useLocationSelect from '../../hooks/utils/useLocationSelect'
import Select from 'react-select'

const ImportInfoForm = () => {

    // fetch hook variables
    const { newImage: image } = useImportContext()
    const { user } = useAuthContext()

    const species_list = useSpeciesSelect()
    const loc_list = useLocationSelect()

    const { postPhoto, loading, error } = usePostPhoto()
    const { postGuess, loading2, error2 } = usePostGuess()

    const navigate = useNavigate()

    
    // FORM INFORMATIONS
    const [ location, setLocation ] = useState('')
    const [ date, setDate ] = useState('')
    const [ species, setSpecies ] = useState('')
    const [ certitude, setCertitude ] = useState('')




    // SUBMIT FUNCTION
    const handleSubmit = async ( e ) => {

        e.preventDefault()

        if ( !image || !user ) {
            throw Error('There is an error with auth and photos context')
        }

        const user_id = user.user_id
        const loc = location.value

        
        // First create the Photo doc
        // this hook fetches the post request and stores the new doc to the context
        const response = await postPhoto(image, loc, date, user_id)

        if(!response) { throw Error('postPhoto did not succeed')}

        const guess = species.value
        const photo_id = response._id

        // Second, create the guess doc
        // this hook fetches the post request
        const response2 = await postGuess(photo_id, guess, certitude, user_id)

        if(!response2) {throw Error('postGuess did not succeed')}

        // reset the form and redirect to thank you page
        e.target.reset()

        navigate('/import/thank-you')
    }

    return (
        <form  onSubmit={ handleSubmit }>

            <h3>Give us some info</h3>

            <label for="for-loc-select">Where was the photo taken ?: </label>

            <Select
                options={loc_list}
                id="for-loc-select"
                value={location}
                onChange={(elem) => setLocation(elem)}
                styles={{
                        control: (baseStyles, state) => ({
                        ...baseStyles,
                        }),
                }}
                required
            />


            <label>When ?: </label>
            <input
                type='date'
                onChange={(e) => setDate(e.target.value)}
                value={ date }
                required
            />


            <label for="for-species-select">Guess the species: </label>

            <Select
                options={species_list}
                id="for-species-select"
                value={species}
                onChange={(elem) => setSpecies(elem)}
                styles={{
                        control: (baseStyles, state) => ({
                        ...baseStyles,
                        }),
                }}
                required
            />

            <label>How confident do you feel ?: </label>
            <div className='row-layout'><input
                type='range'
                id="range"
                min="0" max="100"
                onChange={(e) => setCertitude(e.target.value)}
                value={ certitude }
                required
            /> <p style={{fontSize: 0.7 + 'em', paddingTop: 0.85 + 'em'}}> value: {certitude}</p>
            </div>

            <button disabled={ loading || loading2 || !location || !date || !species || !certitude } id="button" className='darker-button'>Confirm</button>
            { error &&  <div className='error'>{ error }</div> }
            { error2 &&  <div className='error'>{ error2 }</div> }

        </form>
    )
}

export default ImportInfoForm