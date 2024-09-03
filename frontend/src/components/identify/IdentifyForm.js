// imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/contexthooks/useAuthContext'
import { useIdentifyContext } from '../../hooks/contexthooks/useIdentifyContext'

import { usePostGuess } from '../../hooks/usePostGuess'
import useSpeciesSelect from '../../hooks/utils/useSpeciesSelect'
import Select from 'react-select'



const IdentifyForm = () => {
    const CONFIDENCE_THRESH = 0.60

    
    const [ species, setSpecies ] = useState(null)
    const [ certitude, setCertitude ] = useState(null)

    const { object: photo } = useIdentifyContext()
    const { user } = useAuthContext()

    const navigate = useNavigate()

    const species_list = useSpeciesSelect()

    const { postGuess, loading, error } = usePostGuess()


    const handleSubmit = async ( e ) => {
        e.preventDefault()

        const user_id = user.user_id
        const guess = species.value

        const successful = await postGuess(photo._id, guess, certitude, user_id)
        

        if(successful){

            const response = await fetch('/api/guess/likely/' + photo._id, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${ user.token }`
                }
            })

            const json = await response.json()

            let new_is_classed = false
            console.log("max: ", Math.max(...json.confidence))
            console.log("higher or not: ", Math.max(...json.confidence) > CONFIDENCE_THRESH)
            
            if (Math.max(...json.confidence) > CONFIDENCE_THRESH){

                new_is_classed = true 
                console.log("new: ", new_is_classed)
            } 


            const formData = new FormData()
            formData.append('is_classed', new_is_classed)
            
            for (let entry of photo.delete_flags) {
                formData.append('delete_flags', entry)
            }

            await fetch('/api/photo/' + photo._id, {
                method: "PATCH",
                headers: { 'Authorization': `Bearer ${ user.token }`
                },
                body: formData
            })

            const mainText = "Your guess was successfully registered !"

            e.target.reset()

            navigate("/selected/thank-you", {state: { mainText: mainText }})
        }

    }

return (
    <div className="image-form-layout">

        <div className="image-area">
            { photo && <img src={"/api/" + photo.imagepath} className='image-main'  alt="" /> }
        </div>

        <div className="form-area">

            
            <form className='form' onSubmit={ handleSubmit }>
                <h3>Your Guess: </h3>


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
                <input
                    type='range'
                    min="0" max="100"
                    onChange={(e) => {
                        if(e.target.value === 0){
                            setCertitude(0.000001)
                        } else {
                            setCertitude(e.target.value)
                        }
                    }}
                    value={ certitude }
                    required
                />

                <button disabled={loading} id="button" className='darker-button'>Confirm</button>
                { error &&  <div className='error'>{ error }</div> }

                                    
            </form>


        </div>
    
        
    </div>

    

)
}

export default IdentifyForm