// imports
import { Link } from 'react-router-dom'

import { useAuthContext } from '../hooks/contexthooks/useAuthContext'

import Icon from '../components/Icon'

const Home = () => {

    const { user } = useAuthContext()

    return (

        <div className="page">
            <div className='page-header'>

                <div className='home-logo'>
                
                    <Icon  size={"home-size"}/>
                    <h1>Avianity</h1>   

                </div>
                

            </div>

            <div className='page-body'>
                { user && (

                    <div className='main-buttons'>
                        <Link to= "/import" id="button" className="lighter-button">Import</Link>

                        <Link to= "/explore" id="button" className="darker-button">Explore</Link>
                    </div>

                )}

                { !user && (
                    <div className='paragraph'>
                        <p><center>Welcome to our site !<br/>If you love birds, consider joining us,</center></p>
                        <p><center>users on this site can share their bird observations and guess the species that appears on other's photos !</center></p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home