// imports
import { useEffect } from 'react'
import { useImportContext } from '../../hooks/contexthooks/useImportContext'
import ImportInfoFrom from '../../components/import/ImportInfoForm'

import TitleAndReturn from '../../components/TitleAndReturn'
import { useNavigate, useNavigationType } from 'react-router-dom'

const ImportSubmit = () => {
    const { newUrl: url } = useImportContext()

    const navigate = useNavigate()
    const navigationType = useNavigationType()
    
    useEffect( () => {
        if (navigationType === "POP"){

            navigate('/import')
        }
    }, [navigate, navigationType])
    
    return (
        <div className="page">
            
            <div className="page-header">
                <TitleAndReturn title="Import a Photo !" />
                <p>We need a few informations about your photo, as well as your initial guess for the species:</p>
            </div>

            <div className="page-body">

                <div className='image-form-layout'>
        
                    <div className='image-area'>
                        { url && <img src={ url } className='image-main' alt="" /> }
                        
              
                    </div>

                    <div className='form-area'>
                        <ImportInfoFrom />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ImportSubmit