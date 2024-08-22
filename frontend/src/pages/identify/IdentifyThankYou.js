// imports
import { useEffect } from "react"
import { useLocation, useNavigate, useNavigationType } from "react-router-dom"
import Selection from "../../components/identify/Selection"

const IdentifyThankYou = () => {


    const location = useLocation()
    const navigate = useNavigate()
    const navigationType = useNavigationType()

    useEffect( () => {
        if (navigationType === "POP"){
                navigate('/explore')
        }
    }, [navigate, navigationType])


    return (

        <div className="page">

            <div className="page-header">
                <div className="page-title">
                    <h2>Thank you !</h2>
                </div>
                <p>{ location.state.mainText }</p>
            </div>


            <div className="page-body">
                <Selection />

            </div>
        </div>
    )
}

export default IdentifyThankYou