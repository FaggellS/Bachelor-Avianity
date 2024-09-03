// imports
import { useNavigate } from "react-router-dom"


const AboutUs = () => {
    const navigate = useNavigate()

    return (
        <div className="page">


            <div className="page-header" id="p-page">
                <div className='row-layout'>
                    <div className='weight'>
                        <span className="return-button" onClick={() => navigate("/")}><strong>🏠︎</strong></span>
                    </div>
                    <div className="page-title" id="big-title">
                        <h1>About us</h1>
                    </div>
                    <div className="weight" />
                </div>
                <p></p>
            </div>



            <div className="page-body">
                <div className="general-info" >
                    <p><center>
                    This Website has been developped in the context of a Bachelor's work 
                    in Computer science at the University of Fribourg.
                    </center></p>

                    <p><center>
                    The aim of this project is to create a web application on which users can come document their bird observations and 
                    help identify the bird species on other's photos. This way we would help document bird sightings in Switzerland and 
                    create enthusiasm around the subject of ornithology.
                    </center></p>

                    <p><center>
                    This site relies on the expertise of its users in order to build a reliable photo bank of birds from switzerland.
                    With enough contributions, we would be able to produce a solid dataset of birds from switzerland. We could 
                    then conduct an analysis on the bird data we garnered, we could also eventually create a
                    bird identification application to get more people to engage in bird sightings and garner more attention on the subject !
                    </center></p>

                    <p><center>
                    We count on your
                    help to document more sightings, especially for the endangered and rare species that reside in the country !
                    </center></p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs