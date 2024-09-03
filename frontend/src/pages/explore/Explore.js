// imports
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/contexthooks/useAuthContext'

import Selection from '../../components/identify/Selection'



const Explore = () => {
    const {user } = useAuthContext()

    const navigate = useNavigate()

    useEffect( () => {
        if (!user){
            navigate("/")
        }
    })



    return (

        <div id="explore-page" className='page'>


            <div className='page-header'>
                <div className='row-layout'>
                    <div className='weight'>
                        <span className="return-button" onClick={() => navigate("/")}><strong>🏠︎</strong></span>
                    </div>
                    <div className="page-title" id="big-title">
                        <h1>Gallery</h1>
                    </div>
                    <div className="weight" />
                </div>

                <p>Here are all the photos that have been submitted so far</p>
            </div>


            <div className='page-body'>
                {user && <Selection />}
            </div>
        </div>
    )
}

export default Explore