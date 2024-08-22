// hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImportContext } from '../../hooks/contexthooks/useImportContext'

const ImportPhotoForm = () => {

    // fetch hook variables
    const { dispatch } = useImportContext()
    
    const [ image, setImage ] = useState(null)
    const [ url, setUrl ] = useState(null)

    const navigate = useNavigate()


    // submit function
    const handleSubmit = async ( e ) => {
        e.preventDefault()

        if ( image ){
            dispatch( {
                type: 'SET_IMAGE',
                payload: { newImage: image, newUrl: url }
            })

            navigate("/import/submit")

        } else { throw Error('importPhotoForm submit without photo') }
    }

    return (

        <div className='image-form-layout'>

            <div className='image-area'>
                { url && <img src={ url } className='image-main' alt="" /> }
                
            </div>

            <div className='form-area'>
                
                <form onSubmit={ handleSubmit }>

                    <h3>Your photo: </h3>

                    <p>Please submit a photo that checks these conditions:</p>
                    <ul>
                        <li>Must have a bird on it</li>
                        <li>Must have been taken in Switzerland</li>
                        <li>Must have square proportions</li>
                    </ul>

                    <label>Photo :</label>
                    <input 
                        type= "file" 
                        onChange= { (e) => {
                            setImage( e.target.files[0] )
                            let reader = new FileReader();
                            reader.onload = (ev) => {
                                setUrl(ev.target.result);
                            };
                            setUrl(reader.readAsDataURL(e.target.files[0]))
                            }}
                        required
                    />

                    <button disabled={ !image } id='button' className='darker-button'>Confirm</button>


                </form>

            </div>

        </div>
        
    )
}

export default ImportPhotoForm