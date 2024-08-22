// imports
import {  useNavigate, useNavigationType} from 'react-router-dom'
import { useEffect } from 'react'
import { useIdentifyContext } from "../../hooks/contexthooks/useIdentifyContext"
import TitleAndReturn from '../../components/TitleAndReturn'

import FlagForm from '../../components/identify/FlagForm'

const FlagPhoto = () => {
    const { object: photo } = useIdentifyContext()

    const navigate = useNavigate()
    const navigationType = useNavigationType()

    useEffect( () => {

        if (navigationType === "POP"){
            if( !photo){
                navigate('/explore')
            }
        }
    }, [navigate, navigationType, photo])

    return (

        <div className="page">
            <div className="page-header">
                <TitleAndReturn title="Flag a Photo for removal" /> 
                <p>Let us know if a photo is not identifiable:</p>
            </div>

            <div className="page-body">
                
                <FlagForm />
                
            </div>
        </div>
    )
}

export default FlagPhoto