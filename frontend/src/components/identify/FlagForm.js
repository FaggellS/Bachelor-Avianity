// imports
import { useNavigate } from "react-router-dom"

import { useIdentifyContext } from "../../hooks/contexthooks/useIdentifyContext"
import { useAuthContext } from "../../hooks/contexthooks/useAuthContext"


const FlagForm = () => {
    const { object: photo, dispatch } = useIdentifyContext()

    const { user } = useAuthContext()
    const navigate = useNavigate()



    const handleSubmit = async ( e ) => {
        e.preventDefault()

        let newlist = [user.user_id]
        for (let entry of photo.delete_flags){
            newlist.push(entry)
        }

        let mainText = ""
        if ( newlist.length < 3){

            const formData = new FormData()
            formData.append('is_classed', photo.is_classed)
            for ( let entry of newlist ){
                formData.append('delete_flags', entry)
            }
            
            const response = await fetch('/api/photo/' + photo._id, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${ user.token }`
                },
                body: formData
            })

            if(response.ok){
                dispatch({
                    type:"DELETE_OBJECT"
                })
            }

            mainText = "We will keep an eye on this photo !"

        } else {
            
            const formData = new FormData()
            formData.append("imagepath", photo.imagepath)

             await fetch('/api/photo/' + photo._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${ user.token }`
                },
                body: formData

            })

            mainText = "Some users have also flagged this photo, it will now be removed !"

        }

        navigate('/selected/thank-you',  {state: { mainText: mainText }})

    }

    return (
        <div className="image-form-layout">

        <div className="image-area">
            { photo && <img src={"/api/" + photo.imagepath} className='image-main'  alt="" /> }
        </div>

        <div className="form-area">

            <form className='form' onSubmit={ handleSubmit }>
                <h3>Do you feel this photo is inadequate ?</h3>


                <p>Each photo on this site must checks these conditions:</p>
                <ul>
                    <li>Must have a bird on it</li>
                    <li>Must have been taken in Switzerland</li>
                    <li>Must have square proportions</li>
                    <li className="special-text"><strong>The bird should be somewhat identifiable !</strong></li>
                </ul>

                <button id="button" className="darker-button">Confirm</button>

                                
            </form>

        </div>
    
        
    </div>
        
    )
}

export default FlagForm