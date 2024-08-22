// imports
import { useNavigate, useNavigationType } from "react-router-dom"
import { useEffect } from "react"
import { useIdentifyContext } from "../../hooks/contexthooks/useIdentifyContext"

import TitleAndReturn from '../../components/TitleAndReturn'
import IdentifyForm from '../../components/identify/IdentifyForm'



const IdentifyPhoto = () => {

    const { object:photo } = useIdentifyContext()
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
                <TitleAndReturn title="Identify this Bird !" /> 
                <p>Make a guess about what species appears in this photo:</p>
            </div>

            <div className="page-body">
                
                <IdentifyForm />
                
            </div>
        </div>
    )
}

export default IdentifyPhoto