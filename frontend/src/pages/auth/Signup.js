import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignup } from '../../hooks/auth/useSignup'
import { useSignupProcessContext } from '../../hooks/contexthooks/useSignupProcessContext'

const Signup = () => {
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const { dispatch } = useSignupProcessContext()
    const navigate = useNavigate()

    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async ( e ) => {
        e.preventDefault()

        const signupSuccess = await signup(  email, username, password )

        //if false, errors will show up
        //if true, setloading goes false and wait for confirmation
        if (signupSuccess) {
            
            // update signup context
            dispatch({
                type: "SET_MAIL",
                payload: { email: email, username: username, password: password }
            })

            navigate("/confirm-signup")
        }
    }

    return (

        <div className="page">
            <div className='page-body'>

                <form id="auth" onSubmit={handleSubmit}>

                    <h3>Sign upHALLO</h3>

                    <label>Email: </label>
                    <input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={ email }
                    />

                    <label>Username: </label>
                    <input
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        value={ username }
                    />

                    <label>Password: !!</label>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={ password }
                    />
                    <p style={{fontSize: 0.4 + 'em'}}>Your password must have at least one number and an uppercase and lowercase letter, and at least one special character.</p>

                    <button disabled={ isLoading } id="button" className="darker-button"> Sign up </button>
                    { error && <div className='error'> { error } </div> }


                </form>

                <p>Already have an account ? {<Link to="/login">Log in here</Link>}</p> 
            
            </div>
        </div>
    )
}

export default Signup