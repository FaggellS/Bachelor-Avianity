import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLogin } from '../../hooks/auth/useLogin'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { login, isLoading, error } = useLogin()

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        await login(email, password)
    }

    return (

        <div className="page">
            <div className='page-body'>

                    
                <form id='auth' onSubmit={ handleSubmit }>
                    <h3>Log in to your account:</h3>

                    <label>Email: </label>
                    <input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={ email }
                    />

                    <label>Password: </label>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={ password }
                    />
                    
                    
                    <button disabled={isLoading} id="button" className="darker-button"> Log in </button>
                    { error && <div className='error'>{ error }</div> }

                    <Link to="/login/reset">Forgot password ?</Link>
                </form>
                
                
                <p>Don't have an account ? {<Link to="/signup">Sign up here</Link>}</p> 

            </div>
        </div>
    )
}

export default Login