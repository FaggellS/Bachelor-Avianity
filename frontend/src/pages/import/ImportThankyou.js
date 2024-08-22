// imports
import { useEffect } from 'react'
import { useNavigate, useNavigationType } from 'react-router-dom'
import { useImportContext } from '../../hooks/contexthooks/useImportContext'

const ImportThankyou = () => {
    const { newUrl: url, dispatch } = useImportContext()

    const navigate = useNavigate()
    const navigationType = useNavigationType()

    useEffect( () => {
        if (navigationType === "POP"){
                navigate('/')
        }
    }, [navigate, navigationType])

    const handleClick = (e) => {
        e.preventDefault()

        dispatch({
            type: 'DELETE_IMAGE',
            payload: null
        })

        navigate("/")
    }

    return (

        <div className="page">
            

            <div className='page-header'>
                <div className='page-title'>
                    <h2>Thank you !!</h2>
                </div>
                <p>Other users will now be able to guess the bird on your photo !</p>
            </div>

            <div className='page-body'>
                <div className='image-centered'>
                    { url && <img className='image-thanks' src={ url } alt="" /> }
                </div>

                <div className='main-buttons'>
                    <button id="button" className='lighter-button' onClick={ handleClick }>Home</button>
                </div>


            </div>


        </div>
    )
}

export default ImportThankyou