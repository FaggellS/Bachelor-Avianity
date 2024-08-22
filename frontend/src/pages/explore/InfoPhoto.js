// imports
import { useNavigate, useNavigationType } from 'react-router-dom'
import {  useEffect } from 'react'

import TitleAndReturn from '../../components/TitleAndReturn'
import Details from '../../components/identify/Details'
import { useIdentifyContext } from '../../hooks/contexthooks/useIdentifyContext'


const InfoPhoto = () => {
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
                <TitleAndReturn title="Information about this photo" />
                <p>Here's what we gathered</p>
            </div>


            <div className="page-body">

                <Details />

            </div>
        </div>
    )
}

export default InfoPhoto