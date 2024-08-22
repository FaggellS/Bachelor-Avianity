
// imports

import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/contexthooks/useAuthContext'
import { useLogout } from '../hooks/auth/useLogout'

import Icon from './Icon'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const locationpath = useLocation().pathname


    const handleClick = async (e) => {
        e.preventDefault()
        logout()
    }


    return (

        <header>
            <div className="container">
                <div className='nav-left'>
                { locationpath !== "/" &&
                    <Link to="/">
                        <div className='nav-left'>
                        <Icon size={"navbar-size"} photo={"logo"} />
                        <h2><strong>Avianity</strong></h2>
                        </div>
                    </Link>
                }  
                
                </div>
                
                

                <nav className='nav-right'>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/about-us">
                        About us
                    </Link>
                    { user && (
                        <div className='nav-left'>
                            <Link to="/user"><Icon size={"navbar-size"} photo={"icon"} /></Link>
                            <button onClick={handleClick}>LOG OUT</button>
                        </div>
                    )}

                    { !user && (
                        <div>

                            <Link to="/login" id="button" className="lighter-button">Log in</Link>

                            <Link to="/signup" id="button" className="darker-button">Sign up</Link>

                        </div>
                    )}
                    
                </nav>
            </div>
        </header>
    )
}

export default Navbar